import { Router } from 'express';
import { getAccounts, } from '../controllers/accountInfo';
const routes = Router();

routes.get('/', getAccounts);



export default routes;