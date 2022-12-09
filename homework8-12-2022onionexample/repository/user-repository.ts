import { DeleteResult } from "typeorm";
import User from "../entities/user";

export interface IUserRepository {
    GetById(id: number): Promise<User>
    CreateUser(user: User): Promise<User>
    UpdateUser(user: User): Promise<User>
    DeleteUser(id: number): Promise<Number> | Promise<null>
}