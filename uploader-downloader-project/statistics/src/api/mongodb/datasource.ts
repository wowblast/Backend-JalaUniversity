import { DataSource } from "typeorm"
import { AccountEntity } from "./entities/accountEntity";

export const AppDataSource = new DataSource({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'uploader',
    synchronize: true,
    logging: false,
    entities: [AccountEntity],
    migrations: [],
    subscribers: []
  });