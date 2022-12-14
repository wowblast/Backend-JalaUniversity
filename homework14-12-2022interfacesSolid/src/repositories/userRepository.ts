import IUserRepository from "../interfaces/IUserRepository";
import User from "../User";

export default class UserRepository implements IUserRepository {
    Insert(t: User): void {
        console.log("create user", t)
    }
    Update(t: User): void {
        console.log("update user", t)
    }
    Get(id: number): User {
        console.log("get user", id)
        return new User()
    }
    Delete(id: number): void {
        console.log("delete user", id)
    }
   

}