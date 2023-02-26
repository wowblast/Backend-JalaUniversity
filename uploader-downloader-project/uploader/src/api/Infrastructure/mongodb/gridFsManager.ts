import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { MongoRepository } from "typeorm";
import { FileData } from "./entities/fileData";
import { FileChunk } from "./entities/fileChunk";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";
import { File } from "../../services/entities/file";
import { FileMapper } from "../mappers/fileMapper";
import { GoogleDriveManager } from "../googledrive/googledriveManager";
import { statusTypes } from "../../types/statusTypes";
import { SingletonAppDataSource } from "./datasource";

export class GridFsManager {
  private bucket: GridFSBucket;
  private gfs;
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

    this.mongouri = "mongodb://localhost:27017";
    this.repository = this.dataSourse.getAppDataSource().getMongoRepository(FileData);
    this.chunksRepository = this.dataSourse.getAppDataSource().getMongoRepository(FileChunk);

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
    const fileFound: FileData = await this.repository.findOneBy({
      filename,
    });
    return fileFound ? FileMapper.toDomainEntity(fileFound) : null;
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
  }

  async deleteFile(filename: string) {
    const fielFounded: FileData = await this.repository.findOneBy({
      filename,
    });
    await this.chunksRepository.deleteMany({
      files_id: fielFounded?._id || '',
    });
    console.log("delted file", fielFounded);
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
  url: "mongodb://127.0.0.1:27017/uploader",
  file: (req, file) => {
    file.fileName=  new Date().getTime() + file.originalname
    return new Promise((resolve, reject) => {
      const filename = file.fileName;
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
