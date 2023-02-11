import { Router } from 'express';
import { uploadFile, getFile, deleteFile } from '../controllers/file';
import { uploadFileToMongo } from '../Infrastructure/mongodb/gridFsManager';
const routes = Router();

routes.get('/file', getFile);
routes.post('/file',uploadFileToMongo.single('file'), uploadFile);
routes.delete('/file', deleteFile);

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;