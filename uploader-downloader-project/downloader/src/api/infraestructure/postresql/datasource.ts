import { DataSource } from "typeorm"
import { AccountEntity } from "./entities/accountEntity";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";
import { FileReportEntity } from './entities/fileReportEntity';
import { AccountReportEntity } from './entities/accountReportEntity';



  export class SingletonAppDataSource {
    private AppDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'downloader',
      username:'postgres',
      password: 'Welcome4$',
      synchronize: true,
      logging: false,
      entities: [AccountEntity, GoogleDriveFileEntity, FileReportEntity, AccountReportEntity],
      migrations: [],
      subscribers: []
    });

    private static instance: SingletonAppDataSource;

    private constructor() { }

    public static getInstance(): SingletonAppDataSource {
        if (!SingletonAppDataSource.instance) {
          SingletonAppDataSource.instance = new SingletonAppDataSource();
        }

        return SingletonAppDataSource.instance;
    }

    public getAppDataSource() {
        return this.AppDataSource
    }

    public async intiazilateAppDataSource() {
      await this.AppDataSource.initialize()
      console.log("datasource ready")
  }

}