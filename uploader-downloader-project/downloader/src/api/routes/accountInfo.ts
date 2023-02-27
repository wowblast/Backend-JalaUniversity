import { Router } from 'express';
import { getAccounts, } from '../controllers/accountInfo';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
const routes = Router();

routes.get('/', getAccounts);

routes.use(ErrorHandlerMiddleware);


export default routes;