import 'reflect-metadata'
import { AppDataSource } from './data-source';
import UserDB from './entities/userDB';
import UserDataAccess from './data-access';
import { Repository } from 'typeorm';
import UserRepository from './repository';

class Test {
    async iniatializeDb(){
        //await AppDataSource.initialize();
        const user = new UserDB();
        user.lastName = "smith"
        user.name = "jhon"

        const dataAccess = new UserDataAccess()
        const dada = new UserRepository()
        //dataAccess.create(user)
console.log(await dada.GetById(1))
        console.log(await dataAccess.read(1))

       

    }
}

new Test().iniatializeDb();