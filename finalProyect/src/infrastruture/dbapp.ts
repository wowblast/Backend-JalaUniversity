import 'reflect-metadata'
import { AppDataSource } from './data-source';
import { Repository } from 'typeorm';
import BoardPositionRepository from './repositories/boardPositionRepository';

class Test {
    async iniatializeDb(){
       // await AppDataSource.initialize();
        const serve = new BoardPositionRepository()
        //serve.CreateBoard(3)
        serve.GetAllPositions()
     
console.log("startDB")
       
       

    }
}

new Test().iniatializeDb();