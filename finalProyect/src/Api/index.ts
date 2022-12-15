import express from 'express'
import boardPositions from './routes/boardPosition'
const app = express()
app.use(express.json());
app.use('/api/boardPositions', boardPositions)

export default app