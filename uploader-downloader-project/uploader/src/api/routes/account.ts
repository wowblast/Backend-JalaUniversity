import { Router } from 'express';
import { createAccount, getAccount, removeAccount, updateAccount, getAllAccounts } from '../controllers/account';
const routes = Router();

routes.get('/:email', getAccount);
routes.get('/', getAllAccounts);
routes.post('/', createAccount);
routes.put('/', updateAccount);
routes.delete('/', removeAccount);

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;