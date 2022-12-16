import { Router } from 'express';
import { createSnakePlayer, updateSnakePlayerDirecction, updateSnakePlayerName } from '../controllers/snakePlayerController';

const routes = Router();

routes.get('/createSnakePlayer', createSnakePlayer);
routes.post('/updateSnakePlayerDirecction', updateSnakePlayerDirecction);
routes.post('/updateSnakePlayerName', updateSnakePlayerName);

export default routes;