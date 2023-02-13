import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { MongoRepository } from "typeorm";
import { AppDataSource } from "./datasource";
import { FileData } from "./entities/fileData";
import { FileChunk } from "./entities/fileChunk";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";
import { File } from "../../services/entities/file";
import { FileMapper } from "../mappers/fileMapper";
import { GoogleDriveManager } from "../googledrive/googledriveManager";
import { statusTypes } from "../../types/statusTypes";

export class GridFsManager {
  private bucket: GridFSBucket;
  private gfs;
  private mongouri;
  private static _instance: GridFsManager = new GridFsManager();
  private client;

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
    this.repository = AppDataSource.getMongoRepository(FileData);
    this.chunksRepository = AppDataSource.getMongoRepository(FileChunk);

  }

  async initMongoDBconnection() {
    this.client = new MongoClient(this.mongouri);
    await new Promise((resolve, reject) => {
      this.client.connect((err) => {
        console.log("MongoDB connected");
        const mongodb = this.client.db("uploader");
        this.bucket = new GridFSBucket(mongodb, { bucketName: "uploads" });
        resolve(1);
      });
    });
  }

  async closeMongoDBconnection() {
    await new Promise((resolve, reject) => {
      this.client.close((err) => {
        console.log("MongoDB closed");       
        resolve(1);
      });
    });
  }

  async getFile(filename: string): Promise<File> {
    await AppDataSource.initialize();
    const fileFound: FileData = await this.repository.findOneBy({
      filename,
    });
    await AppDataSource.destroy();
    return fileFound ? FileMapper.toDomainEntity(fileFound) : null;
  }

  async uploadFileFromGridFsToDrive(filename: string) {
    await AppDataSource.initialize();
    const fileFound: FileData = await this.repository.findOneByOrFail({
      filename,
    });
    await AppDataSource.destroy();
    await this.initMongoDBconnection()
    //const innerThis = this
    await new Promise((resolve, reject) => {
      this.bucket
        .openDownloadStream(new ObjectId(fileFound._id))
        .pipe(
          fs.createWriteStream(
            "./src/api/Infrastructure/mongodb/outtest/" + fileFound.filename
          )
        )
        .on("error", function (error) {
          console.log("error", error);
          reject(error);
        })
        .on("finish", async function () {
          resolve(1);
        });
    });
    await this.closeMongoDBconnection()
    await GoogleDriveManager.getInstance().uploadFileToGoogleDrive(
      fileFound
    );

  }

  getData(streamdata: WritableStream) {
    console.log("strea,", streamdata);
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
