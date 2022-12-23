import express from 'express';
import boardPositions from './routes/boardPosition';
import snakePlayer from './routes/snakePlayer';
import game from './routes/game';
import snakeLeaderBoard from './routes/snakePlayerLeaderBoard';
const app = express();
app.use(express.json());
app.use('/api/boardPositions', boardPositions);
app.use('/api/snakePlayer', snakePlayer);
app.use('/api/game', game);
app.use('/api/snakeLeaderBoard', snakeLeaderBoard);

export default app;
