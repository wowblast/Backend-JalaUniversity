/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import { createSnakePlayer, moveSnakeForwards, updateSnakePlayerDirecction, updateSnakePlayerName } from '../controllers/snakePlayerController'

const routes = Router()

routes.post('/createSnakePlayer', createSnakePlayer)
routes.put('/updateSnakePlayerDirecction', updateSnakePlayerDirecction)
routes.put('/updateSnakePlayerName', updateSnakePlayerName)
routes.put('/moveSnakeForwards', moveSnakeForwards)

export default routes
