import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';

export interface IBoardPositionRepository {
     CreateBoard(size: number): Promise<GameBoardPositionEntity[]>    
     GetAllPositions(): Promise<GameBoardPositionEntity[]> 
     ClearBoard(): Promise<void>
     InsertPointOnBoard(gameBoardPositionEntity: GameBoardPositionEntity): Promise<void>
     RemovePointOnBoard(positionId: number): Promise<void>
     UpdatePointOnBoard(gameBoardPositionEntity: GameBoardPositionEntity): Promise<GameBoardPositionEntity>
     GetPointOnBoard(xPosition: number, yPosition: number) : Promise<GameBoardPositionEntity> 
     GetBoardPointsByPlayerID(playerId: number): Promise<GameBoardPositionEntity[]>
}