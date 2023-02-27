import { DataSource } from "typeorm";
import { AccountEntity } from "./entities/accountEntity";
import { FileChunk } from "./entities/fileChunk";
import { FileData } from "./entities/fileData";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";
import { config } from "../../../../config";
import logger from 'jet-logger';
export class SingletonAppDataSource {
  private static instance: SingletonAppDataSource;
  private AppDataSource = new DataSource({
    type: config.dataBaseConfig.databaseType as any,
    host: config.dataBaseConfig.host,
    port: parseInt(config.dataBaseConfig.post) as number,
    database: config.dataBaseConfig.dataBaseName,
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
    logger.info("datasource ready")
  }
}
