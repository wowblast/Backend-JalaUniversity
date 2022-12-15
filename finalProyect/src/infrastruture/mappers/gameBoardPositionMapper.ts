import GameBoardPosition from '../entities/gameBoardPosition';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import { BoardPositionType } from '../../applicationCore/types.ts/types';

export default class GameBoardPositionMapper {
    static castToDomainEntitiy( gameBoardPosition: GameBoardPosition): GameBoardPositionEntity {
        const gameBoardPositionEntity: GameBoardPositionEntity = new GameBoardPositionEntity(gameBoardPosition.IdPlayer,gameBoardPosition.positionType as BoardPositionType,
            gameBoardPosition.xPosition,
            gameBoardPosition.yPosition)
        return gameBoardPositionEntity
    }
    static castToDBEntity(gameBoardPositionEntity :GameBoardPositionEntity):GameBoardPosition  {
        const gameBoardPosition = new GameBoardPosition()
        gameBoardPosition.IdPlayer = gameBoardPositionEntity.getPositionId()
        gameBoardPosition.positionType = gameBoardPositionEntity.getBoardPositionType()
        gameBoardPosition.xPosition = gameBoardPositionEntity.getXPosition()
        gameBoardPosition.yPosition = gameBoardPositionEntity.getYPosition()

        return gameBoardPosition
    }
}