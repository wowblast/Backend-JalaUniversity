import GameBoardPosition from '../entities/gameBoardPosition';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import { BoardPositionType, SnakeDirection } from '../../applicationCore/types.ts/types';

export default class GameBoardPositionMapper {
    static castToDomainEntitiy( gameBoardPosition: GameBoardPosition): GameBoardPositionEntity {
        const gameBoardPositionEntity: GameBoardPositionEntity = new GameBoardPositionEntity(gameBoardPosition.playerId, gameBoardPosition.id, gameBoardPosition.snakeBodyIndentifier , gameBoardPosition.positionType as BoardPositionType,
            gameBoardPosition.xPosition,
            gameBoardPosition.yPosition,
            gameBoardPosition.snakeDirection as SnakeDirection)
        return gameBoardPositionEntity
    }
    static castToDBEntity(gameBoardPositionEntity :GameBoardPositionEntity):GameBoardPosition  {
        const gameBoardPosition = new GameBoardPosition()
        gameBoardPosition.playerId = gameBoardPositionEntity.getPlayerId()
        gameBoardPosition.positionType = gameBoardPositionEntity.getBoardPositionType()
        gameBoardPosition.xPosition = gameBoardPositionEntity.getXPosition()
        gameBoardPosition.yPosition = gameBoardPositionEntity.getYPosition()
        gameBoardPosition.id = gameBoardPositionEntity.getPositionId()
        gameBoardPosition.snakeBodyIndentifier = gameBoardPositionEntity.getSnakeBodyIdentifier()
        gameBoardPosition.snakeDirection = gameBoardPositionEntity.getSnakeDirection()
        return gameBoardPosition
    }
}