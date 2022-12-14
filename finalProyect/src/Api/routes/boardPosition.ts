import {getBoardPositions} from '../controllers/boardPositionController'
import { Router } from 'express';

const routes = Router();

routes.get('/', getBoardPositions);


export default routes;