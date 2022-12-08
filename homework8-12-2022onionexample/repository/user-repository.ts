import User from "../entities/user";

export interface IUserRepository {
    GetById(id: number): Promise<User>
}