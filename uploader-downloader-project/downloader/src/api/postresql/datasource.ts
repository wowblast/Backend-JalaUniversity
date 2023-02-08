import { DataSource } from "typeorm"
import { AccountEntity } from "./entities/accountEntity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'downloader',
    username:'postgres',
    password: 'Welcome4$',
    synchronize: true,
    logging: false,
    entities: [AccountEntity],
    migrations: [],
    subscribers: []
  });