import User from "../entities/user"

export interface IuserService {
    GetUserByID(id: number): Promise<User>
    CreateNewUser(user: User): Promise<User>
    UpdateOneUser(user: User): Promise<User>
    DeleteOneUser(id: number): Promise<Number> | Promise<null>
}