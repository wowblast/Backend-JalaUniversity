/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import { createGame, startGameAuto, stopGameAuto } from '../controllers/gameController'

const routes = Router()

routes.post('/createGame', createGame)
routes.post('/startGameAuto', startGameAuto)
routes.post('/stopGameAuto', stopGameAuto)

export default routes
