import 'reflect-metadata'
import { container } from './repository/inversely.config'
import  User  from './entities/user';
import { USER } from './repository/types';
import { IUserRepository } from './repository/user-repository';


const userService = container.get<IUserRepository>(USER)


class Test {
    async start(){
        const user = await userService.GetById(2)
        console.log(user)

    }
}

new Test().start();

