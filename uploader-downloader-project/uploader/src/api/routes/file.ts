import { Router } from 'express';
import { uploadFile, getFile, deleteFile } from '../controllers/file';
import { uploadFileToMongo } from '../Infrastructure/mongodb/gridFsManager';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
import verifyFilenameData from '../middlewares/verifyFilenameData';
import verifyFileStatus from '../middlewares/verifyFileStatus';
const routes = Router();

routes.get('/file',verifyFilenameData, getFile);
routes.post('/file',verifyFileStatus , uploadFileToMongo.single('file'), uploadFile);
routes.delete('/file', verifyFilenameData, deleteFile);
routes.use(ErrorHandlerMiddleware)

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;