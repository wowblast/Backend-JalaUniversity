import express from 'express'
import boardPositions from './routes/boardPosition'
const app = express()
app.use('/api/boardPositions', boardPositions)

export default app