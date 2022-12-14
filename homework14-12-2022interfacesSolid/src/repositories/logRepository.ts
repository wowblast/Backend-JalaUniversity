import IeventLogRepository from "../interfaces/IeventLog";
import EventLog from '../eventLog';

export default class LogRepository implements IeventLogRepository {
   
    Insert(t: EventLog): void {
        console.log("create log", t)
    }
   
}