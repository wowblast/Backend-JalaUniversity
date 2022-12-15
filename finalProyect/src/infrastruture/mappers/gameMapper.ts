import Game from '../entities/game';
import GameEntity from '../../applicationCore/entities/gameEntity';
import { GameStatus } from '../../applicationCore/types.ts/types';
export default class GameMapper {
    static castToDomainEntitiy( gameInstance: Game): GameEntity {
        const gameEntity: GameEntity = new GameEntity(gameInstance.id, gameInstance.status as GameStatus, gameInstance.stepIntervalBySeconds, gameInstance.boardSize)
            
        return gameEntity
    }
    static castToDBEntity(gameEntity :GameEntity): Game {
        const gameInstance = new Game()
        gameInstance.id = gameEntity.getId()
        gameInstance.boardSize = gameEntity.getBoardSize()
        gameInstance.status = gameEntity.getStatus()
        gameInstance.stepIntervalBySeconds = gameEntity.getStepIntervalBySeconds()
        return gameInstance       
    }
}