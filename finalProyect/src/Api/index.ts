import express from 'express'
import boardPositions from './routes/boardPosition'
import snakePlayer from './routes/snakePlayer'
import game from './routes/game'

const app = express()
app.use(express.json())
app.use('/api/boardPositions', boardPositions)
app.use('/api/snakePlayer', snakePlayer)
app.use('/api/game', game)

export default app
