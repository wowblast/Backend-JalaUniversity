import { Router } from 'express';
import { uploadFile } from '../controllers/file';
const routes = Router();

routes.get('/file', uploadFile);
routes.post('/file', uploadFile);
routes.put('/file', uploadFile);
routes.delete('/file', uploadFile);

//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;