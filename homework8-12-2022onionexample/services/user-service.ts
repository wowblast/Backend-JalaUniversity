import { inject } from "inversify";
import User from "../entities/user";
import { USER } from '../repository/types';
import { IUserRepository } from "../repository/user-repository";

export default class UserService{
    private userRepository: IUserRepository

    constructor(@inject(USER) userRepository: IUserRepository ){
        this.userRepository = userRepository

    }

    async GetById(id: number): Promise<User> {
        return  await this.userRepository.GetById(id);
    }

    async CreateUser(user: User): Promise<User> {
       
        return await this.CreateUser(user);
    }

    async UpdateUser(user: User): Promise<User> {
       
        return await this.UpdateUser(user)
    }
    async DeleteUser(id: number){
        
         await this.DeleteUser(id)
    }    

   
    
}
