import { Router } from 'express';
import { createReport, deleteReport, getReport, updateReport } from '../controllers/report';
const routes = Router();

routes.get('/', getReport);
routes.post('/', createReport);
routes.put('/', updateReport);
routes.delete('/', deleteReport);
export default routes;