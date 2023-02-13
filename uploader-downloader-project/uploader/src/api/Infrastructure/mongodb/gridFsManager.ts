import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { MongoRepository } from "typeorm";
import { AppDataSource } from "./datasource";
import { FileData } from "./entities/fileData";
import { FileChunk } from "./entities/fileChunk";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";
import { File } from '../../services/entities/file';
import { FileMapper } from '../mappers/fileMapper';
import { GoogleDriveManager } from '../googledrive/googledriveManager';

export class GridFsManager {
  private bucket: GridFSBucket;
  private gfs;
  private mongouri;
  private static _instance: GridFsManager = new GridFsManager();

  private repository: MongoRepository<FileData>;
  private chunksRepository: MongoRepository<FileChunk>;

  constructor() {
    if (GridFsManager._instance) {
      throw new Error(
        "Error: Instantiation failed: Use RabbitMqController.getInstance() instead of new."
      );
    }
    this.initializeMongoDB();
    GridFsManager._instance = this;
  }

  async initializeMongoDB() {
    this.mongouri = "mongodb://localhost:27017";
    const client = new MongoClient(this.mongouri);
    client.connect(err => {
      console.log("MongoDB connected");
      const mongodb = client.db("uploader");
    this.bucket = new GridFSBucket(mongodb, { bucketName: 'uploads' });
  
  });    
    this.repository = AppDataSource.getMongoRepository(FileData);
    this.chunksRepository = AppDataSource.getMongoRepository(FileChunk);
  }

  async getFile(filename: string): Promise<File> {
    await AppDataSource.initialize();
    const fileFound: FileData = await this.repository.findOneByOrFail({
      filename,
    });

    const chunks: FileChunk[] = await this.chunksRepository.findBy({
      files_id: fileFound._id,
    });

    //console.log("buket", this.bucket)
    //const cursor = this.bucket.find({_id:fileFound._id}).toArray();
    //this.downloadFile(fileFound)

    //const a =   this.bucket.openDownloadStream(new ObjectId(fileFound._id))
    //fs.write
    await AppDataSource.destroy();
    //console.log("cursor", a)
    return FileMapper.toDomainEntity(fileFound);
  }

  async downloadFile(filename: string) {
    await AppDataSource.initialize();
    const fileFound: FileData = await this.repository.findOneByOrFail({
      filename,
    });
    await AppDataSource.destroy();
    this.bucket.openDownloadStream(new ObjectId(fileFound._id))
        .pipe(fs.createWriteStream('./src/api/Infrastructure/mongodb/outtest/'+ fileFound.filename)).
        on('error', function(error) {
          console.log("error",error)
        }).
        on('finish', async function() {
          console.log('done!');
          await GoogleDriveManager.getInstance().uploadFileToGoogleDrive(fileFound)
          console.log("done file to all accounts")
        });
    
  }

  getData(streamdata: WritableStream) {
    console.log("strea,",streamdata)

  }

  getFiles() {}

  async deleteFile(filename: string) {   

    await AppDataSource.initialize();
    const fielFounded: FileData = await this.repository.findOneByOrFail({
      filename,
    });
    await this.chunksRepository.deleteMany({
      files_id: fielFounded._id,
    });
    console.log("delted file", fielFounded);
    await this.repository.deleteOne(fielFounded);
    await AppDataSource.destroy();
    return fielFounded;
  }

  async updateFileStatus(filename: string, status: string) {
    await AppDataSource.initialize();

    const file: FileData = await this.repository.findOneByOrFail({
      filename,
    });

    console.log("updating status");
    file.status = status;
    await this.repository.save(file);

    await AppDataSource.destroy();
  }

  public static getInstance(): GridFsManager {
    return GridFsManager._instance;
  }
}
const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/uploader",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename,
        bucketName: "uploads",
      };
      console.log("subido", fileInfo);
      resolve(fileInfo);
    });
  },
});
export const uploadFileToMongo = multer({ storage });
