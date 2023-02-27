import { DataSource } from "typeorm";
import { AccountEntity } from "./entities/accountEntity";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";
import { FileReportEntity } from "./entities/fileReportEntity";
import { AccountReportEntity } from "./entities/accountReportEntity";
import { FileDataEntity } from "./entities/fileDataEntity";
import { config } from "../../../../config";
import logger from 'jet-logger';

export class SingletonAppDataSource {
  private AppDataSource = new DataSource({
    type: config.dataBaseConfig.databaseType as any,
    host: config.dataBaseConfig.host,
    port: parseInt(config.dataBaseConfig.port),
    database: config.dataBaseConfig.dataBaseName,
    username: config.dataBaseConfig.userName,
    password: config.dataBaseConfig.password,
    synchronize: true,
    logging: false,
    entities: [
      AccountEntity,
      GoogleDriveFileEntity,
      FileReportEntity,
      AccountReportEntity,
      FileDataEntity,
    ],
    migrations: [],
    subscribers: [],
  });

  private static instance: SingletonAppDataSource;

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
    logger.imp("datasource ready");
  }
}
