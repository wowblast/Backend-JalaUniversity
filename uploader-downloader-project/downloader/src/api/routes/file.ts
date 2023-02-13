import { Router } from 'express';
import { downloadFile, listFile } from '../controllers/file';
const routes = Router();

//routes.get('/file/:id', downloadFile);
routes.get('/file', listFile);

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;