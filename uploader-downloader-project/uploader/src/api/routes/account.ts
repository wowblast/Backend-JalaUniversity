import { Router } from 'express';
import { createAccount, getAccount, removeAccount, updateAccount, getAllAccounts } from '../controllers/account';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
const routes = Router();
import  verifyAccountData  from '../middlewares/verifyAccountData'
import  verifyAccountEmail  from '../middlewares/verifyAccountEmail'

routes.get('/:email', getAccount);
routes.get('/', getAllAccounts);
routes.post('/',verifyAccountData, createAccount);
routes.put('/',verifyAccountData , updateAccount);
routes.delete('/',verifyAccountEmail, removeAccount);
routes.use(ErrorHandlerMiddleware)

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;