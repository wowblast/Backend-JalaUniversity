import { Router } from 'express';
import { createAccount, getAccount, removeAccount, updateAccount } from '../controllers/accountInfo';
const routes = Router();

routes.get('/', getAccount);
routes.post('/', createAccount);
routes.put('/', updateAccount);
routes.delete('/', removeAccount);

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;