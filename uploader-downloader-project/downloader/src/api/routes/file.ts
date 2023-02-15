import { Router } from 'express';
import { downloadFile, listFiles } from '../controllers/file';
const routes = Router();

//routes.get('/file/:id', downloadFile);
routes.get('/', listFiles);
routes.get('/:fileName', downloadFile);


//routes.post('/file', createBoard);
//routes.delete('/file', clearBoard);

export default routes;