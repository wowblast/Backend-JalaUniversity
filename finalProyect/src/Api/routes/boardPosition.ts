import {clearBoard, createBoard, getBoardPositions} from '../controllers/boardPositionController'
import { Router } from 'express';

const routes = Router();

routes.get('/getBoardPositions', getBoardPositions);
routes.post('/createBoard', createBoard);
routes.post('/clearBoard', clearBoard);

export default routes;