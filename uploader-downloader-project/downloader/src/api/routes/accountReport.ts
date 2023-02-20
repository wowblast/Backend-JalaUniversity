import { Router } from 'express';
import { getAccountReport,createAccountReport } from '../controllers/accountReport';
const routes = Router();

routes.get('/', getAccountReport);
routes.post('/', createAccountReport);

export default routes;