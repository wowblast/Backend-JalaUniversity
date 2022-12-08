import { DataSource } from 'typeorm';
import UserDB from './entities/userDB';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqllite",
    synchronize: true,
    logging: false,
    entities: [UserDB],
    migrations: [],
    subscribers:[]

})

