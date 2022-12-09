import 'reflect-metadata'
import { container } from './repository/inversely.config'
import { USERSERVICE } from './repository/types';
import User from './entities/user';
import { IuserService } from './services/Iuser-service';


const userService = container.get<IuserService>(USERSERVICE)


class Test {
    async start(){
        const newUser = new User()

        newUser.name= "mitch"
        newUser.lastName =" zambrana"
        console.log("created",await userService.CreateNewUser(newUser) )
        
        const user5 = await userService.GetUserByID(1)
        console.log("read id 1 ",user5)
        user5.name = "hh"
        console.log("update id 1",await userService.UpdateOneUser(user5))
        console.log("delete id 12 ",await userService.DeleteOneUser(12))
        

    }
}

new Test().start();

