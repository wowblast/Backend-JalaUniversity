import IgetRepository from '../genericInterfaces/IgetRepository';
import IinsertRepository from '../genericInterfaces/IinsertRepository';
import IupdateRepository from '../genericInterfaces/IupdateRepository';
import User from '../User';
import IdeleteRepository from '../genericInterfaces/IdeleteRepository';
import EventLog from '../eventLog';
export default interface IeventLogRepository extends IinsertRepository<EventLog> {
    
}