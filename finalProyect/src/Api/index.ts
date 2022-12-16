import express from 'express'
import boardPositions from './routes/boardPosition'
import snakePlayer from './routes/snakePlayer'

const app = express()
app.use(express.json());
app.use('/api/boardPositions', boardPositions)
app.use('/api/snakePlayer', snakePlayer)

export default app