import GameBoardPositionEntity from '../entities/gameBoardPositionEntity'
import { BoardPositionType, SnakeDirection } from '../types.ts/types'
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class GameBoardPositionFactory {
  static CreateGameBoardPosition (id: number, playerId: number, snakeBodyIdentifier: number, xPosition: number,
    yPosition: number, boardPositionType: BoardPositionType, snakeDirection: SnakeDirection): GameBoardPositionEntity {
    return new GameBoardPositionEntity(playerId, id, snakeBodyIdentifier, boardPositionType, xPosition, yPosition, snakeDirection)
  }
}
