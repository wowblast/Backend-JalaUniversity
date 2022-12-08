import 'reflect-metadata'
import { container } from './repository/inversely.config'
import { USER } from './repository/types';
import { IUserRepository } from './repository/user-repository';
import User from './entities/user';


const userService = container.get<IUserRepository>(USER)


class Test {
    async start(){
        const newUser = new User()

        newUser.name= "mitch"
        newUser.lastName =" zambrana"
        console.log(await userService.CreateUser(newUser) )
        
        const user5 = await userService.GetById(1)
        console.log(user5)
        user5.name = "hh"
        console.log(await userService.UpdateUser(user5))
        console.log(await userService.DeleteUser(10))
        

    }
}

new Test().start();

