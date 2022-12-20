import { DataSource } from 'typeorm';
import BoardPosition from './entities/gameBoardPosition';
import SnakePlayer from './entities/snakePlayer';
import Game from './entities/game';
import SnakePlayerLeaderBoard from './entities/snakePlayerLeaderBoard';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqllite",
    synchronize: true,
    logging: false,
    entities: [BoardPosition, SnakePlayer, Game, SnakePlayerLeaderBoard],
    migrations: [],
    subscribers:[]
})
