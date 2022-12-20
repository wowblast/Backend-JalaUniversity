import Game from '../entities/game';
import GameEntity from '../../applicationCore/entities/gameEntity';
import { GameStatus } from '../../applicationCore/types.ts/types';
import SnakePlayerLeaderBoard from '../entities/snakePlayerLeaderBoard';
import SnakePlayerLeaderBoardEntity from '../../applicationCore/entities/snakePlayerLeaderboardEntity';
export default class SnakePlayerLeaderBoardMapper {
    static castToDomainEntitiy( snakePlayerLeaderBoard: SnakePlayerLeaderBoard): SnakePlayerLeaderBoardEntity {
        const snakePlayerLeaderBoardEntity: SnakePlayerLeaderBoardEntity = new SnakePlayerLeaderBoardEntity(snakePlayerLeaderBoard.id,snakePlayerLeaderBoard.playerId,
            snakePlayerLeaderBoard.name, snakePlayerLeaderBoard.score)
        return snakePlayerLeaderBoardEntity
    }
    
}