import { Router } from 'express';
import { getAccountReport,createAccountReport } from '../controllers/accountReport';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
import verifyAccountEmail from '../middlewares/verifyAccountEmail';
import verifyAccountReport from '../middlewares/verifyAccountReport';
const routes = Router();

routes.get('/',verifyAccountEmail, getAccountReport);
routes.post('/', verifyAccountReport, createAccountReport);
routes.use(ErrorHandlerMiddleware);

export default routes;