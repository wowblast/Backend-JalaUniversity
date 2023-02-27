import { Router } from 'express';
import { downloadFile, listFiles } from '../controllers/file';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
import verifyFilenameData from '../middlewares/verifyFilenameData';
const routes = Router();

routes.get('/', listFiles);
routes.get('/download',verifyFilenameData, downloadFile);
routes.use(ErrorHandlerMiddleware);


export default routes;