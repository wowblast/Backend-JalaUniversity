import { injectable } from 'inversify';
import { AppDataSource } from './data-source';
import UserDB from './entities/userDB';
@injectable() 
export default class UserDataAccess {
    async create(user: UserDB){
        console.log(user)
        const repository = AppDataSource.getRepository(UserDB)
        await repository.save(user);

    }

    async read(id: number) {
        const repository = AppDataSource.getRepository(UserDB)
        return await repository.findOneBy({
            id: id
        })
    }

    async update(user: UserDB) {
        const repository = AppDataSource.getRepository(UserDB)
        return await repository.save(user)
    }

    async delete(id: number) {
        const repository = AppDataSource.getRepository(UserDB)
        return await repository.delete({
            id: id
        })
    }

    
}