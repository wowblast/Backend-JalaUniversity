import EventLog from './eventLog';
import LogRepository from './repositories/logRepository';
import User from './user';
import UserRepository from './repositories/userRepository';
const eventlog = new EventLog()
const user = new User()
const evenrepo = new LogRepository()
const userrepo = new UserRepository()
user.id = 44

eventlog.id = 4
eventlog.message= "even"
userrepo.Insert(user)
userrepo.Update(user)
userrepo.Delete(5)
userrepo.Get(4)
evenrepo.Insert(eventlog)
