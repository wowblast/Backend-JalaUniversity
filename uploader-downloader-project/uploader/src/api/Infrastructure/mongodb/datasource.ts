import { DataSource } from "typeorm";
import { AccountEntity } from "./entities/accountEntity";
import { FileChunk } from "./entities/fileChunk";
import { FileData } from "./entities/fileData";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";

export class SingletonAppDataSource {
  private static instance: SingletonAppDataSource;
  private AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "uploader",
    synchronize: true,
    logging: false,
    entities: [AccountEntity, FileData, FileChunk, GoogleDriveFileEntity],
    migrations: [],
    subscribers: [],
  });
  private constructor() {}

  public static getInstance(): SingletonAppDataSource {
    if (!SingletonAppDataSource.instance) {
      SingletonAppDataSource.instance = new SingletonAppDataSource();
    }

    return SingletonAppDataSource.instance;
  }

  public getAppDataSource() {
    return this.AppDataSource;
  }

  public async intiazilateAppDataSource() {
    await this.AppDataSource.initialize();
    console.log("datasource ready");
  }
}
