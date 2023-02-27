import { Router } from 'express';
import { getFileReports, createFiletReport } from '../controllers/fileReport';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
import verifyFilenameData from '../middlewares/verifyFilenameData';
import verifyFileReport from '../middlewares/verifyFileReport';
const routes = Router();

routes.get('/',verifyFilenameData, getFileReports);
routes.post('/',verifyFileReport ,createFiletReport);
routes.use(ErrorHandlerMiddleware);

export default routes;