import { DataSource } from "typeorm"
import { AccountEntity } from "./entities/accountEntity";
import { FileChunk } from "./entities/fileChunk";
import { FileData } from "./entities/fileData";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";

export const AppDataSource = new DataSource({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'uploader',
    synchronize: true,
    logging: false,
    entities: [AccountEntity, FileData, FileChunk, GoogleDriveFileEntity],
    migrations: [],
    subscribers: []
  });