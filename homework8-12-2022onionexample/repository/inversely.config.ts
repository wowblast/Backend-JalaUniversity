import "reflect-metadata"
import {Container} from 'inversify'
import UserRepository from '../database/repository';
import User from '../entities/user';
import { USER } from './types';
import { IUserRepository } from './user-repository';
import UserDB from '../database/entities/userDB';
const container = new  Container();
container.bind(UserDB).toSelf()
container.bind<IUserRepository>(USER).to(UserRepository)
export { container}