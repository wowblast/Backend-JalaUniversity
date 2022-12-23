/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express';
import { getSnakeLeaderBoard } from '../controllers/snakePlayerLeaderBoardController';

const routes = Router();

routes.get('/getSnakeLeaderBoard', getSnakeLeaderBoard);

export default routes;