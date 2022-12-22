import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
export interface BoardPositionService {
  GetAllPositions: () => Promise<GameBoardPositionEntity[]>
  ClearBoard: () => Promise<void>
  CreateBoard: (boardSize: number) => Promise<GameBoardPositionEntity[]>
  GetBoardPositionByPosition: (xPosition: number, yPosition: number) => Promise<GameBoardPositionEntity>
  UpdateBoardPosition: (gameBoardPositionEntity: GameBoardPositionEntity) => Promise<GameBoardPositionEntity>
  GetBoardPositionByPlayedId: (playerId: number) => Promise<GameBoardPositionEntity[]>
  ClearBoardPositionByPositionId: (positionId: number) => Promise<void>
  GetAllSnakeHeads: () => Promise<GameBoardPositionEntity[]>
}
