import { Router } from 'express';
import { createGame } from '../controllers/gameController';

const routes = Router();

routes.post('/createGame', createGame);

export default routes;