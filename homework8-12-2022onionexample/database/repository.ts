import "reflect-metadata"
import { injectable } from 'inversify';
import User  from '../entities/user';
import UserDB from './entities/userDB';
import { IUserRepository } from '../repository/user-repository';
import { AppDataSource } from './data-source';


@injectable() 
export default class UserRepository implements IUserRepository {
    /*async create(user: User){
        console.log(user)
        const repository = AppDataSource.getRepository(User)
        await repository.save(user);

    }*/

    async GetById(id: number): Promise<User> {
        console.log("numero a buscar "+ id)
        const repository = AppDataSource.getRepository(UserDB)
        console.log(repository)
        const user = await repository.findOneBy({
            id: id
        })
        return user
       
    }

    /*async update(user: User) {
        const repository = AppDataSource.getRepository(User)
        return await repository.save(user)
    }

    async delete(id: number) {
        const repository = AppDataSource.getRepository(User)
        return await repository.delete({
            id: id
        })
    }*/

    
}