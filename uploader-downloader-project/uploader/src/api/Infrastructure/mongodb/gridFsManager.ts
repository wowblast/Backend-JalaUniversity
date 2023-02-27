import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { MongoRepository } from "typeorm";
import { FileData } from "./entities/fileData";
import { FileChunk } from "./entities/fileChunk";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";
import { File } from "../../services/entities/file";
import { FileMapper } from "../mappers/fileMapper";
import { SingletonAppDataSource } from "./datasource";
import { config } from "../../../../config";

export class GridFsManager {
  private bucket: GridFSBucket;
  private mongouri;
  private static _instance: GridFsManager = new GridFsManager();
  private client;

  private repository: MongoRepository<FileData>;
  private chunksRepository: MongoRepository<FileChunk>;
  private dataSourse: SingletonAppDataSource

  constructor() {
    if (GridFsManager._instance) {
      throw new Error(
        "Error: Instantiation failed: Use RabbitMqController.getInstance() instead of new."
      );
    }
    GridFsManager._instance = this;
  }

  async initializeMongoDB() {
    this.dataSourse = SingletonAppDataSource.getInstance();

    this.mongouri = config.gridFsConfig.mongoUri;
    this.repository = this.dataSourse.getAppDataSource().getMongoRepository(FileData);
    this.chunksRepository = this.dataSourse.getAppDataSource().getMongoRepository(FileChunk);

  }

  async initMongoDBconnection() {
    this.client = new MongoClient(this.mongouri);
    await new Promise((resolve, reject) => {
      this.client.connect((err) => {
        const mongodb = this.client.db(config.gridFsConfig.mongoDataBaseName);
        this.bucket = new GridFSBucket(mongodb, { bucketName: config.gridFsConfig.mongoBucketName });
        resolve(1);
      });
    });
  }

  async closeMongoDBconnection() {
    await new Promise((resolve, reject) => {
      this.client.close((err) => {
        resolve(1);
      });
    });
  }

  async getFile(filename: string): Promise<File> {
    const fileFound: FileData = await this.repository.findOneBy({
      filename,
    });
    return fileFound ? FileMapper.toDomainEntity(fileFound) : null;
  }

  async getAllFiles() {
    const filesFound: FileData[] = await this.repository.find()
    return filesFound ? filesFound.map(fileFound => FileMapper.toDomainEntity(fileFound)): [];
  }

  async downloadFileFromGridFsToTempFolder(filename: string) {
    const fileFound: FileData = await this.repository.findOneBy({
      filename,
    });
    await this.initMongoDBconnection()
    //const innerThis = this
    await new Promise((resolve, reject) => {
      this.bucket
        .openDownloadStream(new ObjectId(fileFound._id))
        .pipe(
          fs.createWriteStream(
            config.tempFolderDir + fileFound.filename
          )
        )
        .on("error", function (error) {
          reject(error);
        })
        .on("finish", async function () {
          resolve(1);
        });
    });
    await this.closeMongoDBconnection()
  }

  async deleteFile(filename: string) {
    const fielFounded: FileData = await this.repository.findOneBy({
      filename,
    });
    await this.chunksRepository.deleteMany({
      files_id: fielFounded?._id || '',
    });
    await this.repository.deleteOne(fielFounded);
    return fielFounded;
  }

  async updateFileStatus(filename: string, status: string) {
    const file: FileData = await this.repository.findOneBy({
      filename,
    });
    file.status = status;
    await this.repository.save(file);
  }

  async updateFileName(filename: string, newFileName:string) {
    await this.repository.update({filename},{filename:newFileName})
  }
  public static getInstance(): GridFsManager {
    return GridFsManager._instance;
  }
}
const storage = new GridFsStorage({
  url: config.gridFsConfig.mongoStorageUrl,
  file: (req, file) => {
    file.fileName=  new Date().getTime() + file.originalname
    return new Promise((resolve, reject) => {
      const filename = file.fileName;
      const fileInfo = {
        filename,
        bucketName: config.gridFsConfig.mongoBucketName,
      };
      resolve(fileInfo);
    });
  },
});
export const uploadFileToMongo = multer({ storage });
