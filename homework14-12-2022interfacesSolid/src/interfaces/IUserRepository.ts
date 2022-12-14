import User from "../User";
import IinsertRepository from '../genericInterfaces/IinsertRepository';
import IdeleteRepository from "../genericInterfaces/IdeleteRepository";
import IgetRepository from "../genericInterfaces/IgetRepository";
import IupdateRepository from "../genericInterfaces/IupdateRepository";

export default interface IUserRepository extends IinsertRepository<User>, IupdateRepository<User>, IgetRepository<User>, IdeleteRepository<User> {   

}