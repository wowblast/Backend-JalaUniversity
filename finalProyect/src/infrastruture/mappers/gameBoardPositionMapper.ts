import GameBoardPosition from '../entities/gameBoardPosition';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import { PositionType } from '../../applicationCore/types.ts/types';

export default class GameBoardPositionMapper {
    static castToDomainEntitiy( gameBoardPosition: GameBoardPosition) {
        const gameBoardPositionEntity: GameBoardPositionEntity = new GameBoardPositionEntity(gameBoardPosition.IdPlayer,gameBoardPosition.positionType as PositionType,
            gameBoardPosition.xPosition,
            gameBoardPosition.yPosition)
        return gameBoardPositionEntity
    }
    static castToDBEntity(gameBoardPositionEntity :GameBoardPositionEntity) {
        const gameBoardPosition = new GameBoardPosition()
        gameBoardPosition.IdPlayer = gameBoardPositionEntity.getPositionId()
        gameBoardPosition.positionType = gameBoardPositionEntity.getPositionType()
        gameBoardPosition.xPosition = gameBoardPositionEntity.getXPosition()
        gameBoardPosition.yPosition = gameBoardPositionEntity.getYPosition()
    }
}