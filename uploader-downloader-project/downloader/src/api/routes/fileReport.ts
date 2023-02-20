import { Router } from 'express';
import { getFileReports, createFiletReport } from '../controllers/fileReport';
const routes = Router();

routes.get('/', getFileReports);
routes.post('/', createFiletReport);

export default routes;