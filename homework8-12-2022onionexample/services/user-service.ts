import { inject, injectable } from 'inversify';
import User from "../entities/user";
import { USERREPO } from '../repository/types';
import { IUserRepository } from "../repository/user-repository";
import { IuserService } from './Iuser-service';

@injectable()
export default class UserService implements IuserService{
    private userRepository: IUserRepository

    constructor(@inject(USERREPO) userRepository: IUserRepository ){
        this.userRepository = userRepository

    }

    async GetUserByID(id: number): Promise<User> {
        return  await this.userRepository.GetById(id);
    }

    async CreateNewUser(user: User): Promise<User> {
       
        return await this.userRepository.CreateUser(user);
    }

    async UpdateOneUser(user: User): Promise<User> {
       
        return await this.userRepository.UpdateUser(user)
    }
    async DeleteOneUser(id: number){
        
        return  await this.userRepository.DeleteUser(id)
    }    

   
    
}


