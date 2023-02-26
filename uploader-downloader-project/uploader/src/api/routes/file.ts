import { Router } from 'express';
import { uploadFile, getFile, deleteFile, updateFile } from '../controllers/file';
import { uploadFileToMongo } from '../Infrastructure/mongodb/gridFsManager';
import ErrorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';
import verifyFilenameData from '../middlewares/verifyFilenameData';
import verifyFileStatus from '../middlewares/verifyFileStatus';
import verifynewFileName from '../middlewares/verifynewFileName';
const routes = Router();

routes.get('/file',verifyFilenameData, getFile);
routes.post('/file', uploadFileToMongo.single('file'), uploadFile);
routes.delete('/file', verifyFilenameData, deleteFile);
routes.put('/file', verifynewFileName, updateFile);
routes.use(ErrorHandlerMiddleware)

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;