import "reflect-metadata"
import { injectable } from 'inversify';
import User  from '../entities/user';
import UserDB from './entities/userDB';
import { IUserRepository } from '../repository/user-repository';
import { AppDataSource } from './data-source';
import { DeleteResult } from "typeorm";


@injectable() 
export default class UserRepository implements IUserRepository {
    
    
    

    async CreateUser(user: User): Promise<User> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(UserDB)
        const savedUser = await repository.save(user);

        await AppDataSource.destroy()
        
        return savedUser
    }

    async UpdateUser(user: User): Promise<User> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(UserDB)
        const updatedUser = await repository.save(user)
        await AppDataSource.destroy()

        return updatedUser
    }
    async DeleteUser(id: number): Promise<number> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(UserDB)
        const user = await repository.delete({
            id: id
        })
        await AppDataSource.destroy()
        return user.affected >0 ? id: null
    }    

    async GetById(id: number): Promise<User> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(UserDB)
        const user = await repository.findOneBy({
            id: id
        })
        await AppDataSource.destroy()

        return user
       
    }    
    
}