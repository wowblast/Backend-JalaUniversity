import "reflect-metadata"
import {Container} from 'inversify'
import UserRepository from '../database/repository';
import { USERREPO,USERSERVICE } from './types';
import { IUserRepository } from './user-repository';
import { IuserService } from '../services/Iuser-service';
import UserService from "../services/user-service";
const container = new  Container();
container.bind<IUserRepository>(USERREPO).to(UserRepository)
container.bind<IuserService>(USERSERVICE).to(UserService)
export { container}