import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { BoardPositionType, SnakeDirection } from '../types.ts/types';
export default class GameBoardPositionFactory {
    static CreateGameBoardPosition(id: number, playerId: number, snakeBodyIdentifier: number , xPosition: number, yPosition: number, boardPositionType: BoardPositionType, snakeDirection: SnakeDirection) {
        return new GameBoardPositionEntity(playerId, id, snakeBodyIdentifier, boardPositionType, xPosition, yPosition, snakeDirection )
    }
}