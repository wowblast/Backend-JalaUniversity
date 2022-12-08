import "reflect-metadata"
import {Container} from 'inversify'
import UserRepository from '../database/repository';
import { USER } from './types';
import { IUserRepository } from './user-repository';
const container = new  Container();
container.bind<IUserRepository>(USER).to(UserRepository)
export { container}