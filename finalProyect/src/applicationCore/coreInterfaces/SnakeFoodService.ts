import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';

export interface SnakeFoodService {
  InsertFoodPointOnBoard: (gameBoardPositionEntity: GameBoardPositionEntity) => Promise<void>
  RemoveFoodPointOnBoard: (positionId: number) => Promise<void>
}
