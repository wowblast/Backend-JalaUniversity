import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { BoardPositionType } from '../types.ts/types';
export default class GameBoardPositionFactory {
    static CreateGameBoardPosition(id: number, playerId: number, xPosition: number, yPosition: number, boardPositionType: BoardPositionType) {
        return new GameBoardPositionEntity(playerId, id, boardPositionType, xPosition, yPosition  )
    }
}