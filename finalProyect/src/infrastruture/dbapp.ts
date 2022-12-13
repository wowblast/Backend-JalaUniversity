import 'reflect-metadata'
import { AppDataSource } from './data-source';
import { Repository } from 'typeorm';

class Test {
    async iniatializeDb(){
        await AppDataSource.initialize();
     
console.log("startDB")
       
       

    }
}

new Test().iniatializeDb();