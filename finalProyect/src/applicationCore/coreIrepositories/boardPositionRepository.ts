import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { BoardPositionType } from '../types.ts/types';

export interface BoardPositionRepository {
     GetAllSnakeHeads(): Promise<GameBoardPositionEntity[]>
     CreateBoard(size: number): Promise<GameBoardPositionEntity[]>    
     GetAllPositions(): Promise<GameBoardPositionEntity[]> 
     ClearBoard(): Promise<void>
     InsertPointOnBoard(gameBoardPositionEntity: GameBoardPositionEntity): Promise<void>
     ClearPointOnBoard(positionId: number): Promise<void>
     UpdatePointOnBoard(gameBoardPositionEntity: GameBoardPositionEntity): Promise<GameBoardPositionEntity>
     GetPointOnBoard(xPosition: number, yPosition: number) : Promise<GameBoardPositionEntity> 
     GetBoardPointsByPlayerID(playerId: number): Promise<GameBoardPositionEntity[]>
     GetBoardPointByPlayerIDAndPositionType(player: number, boardPositionType: BoardPositionType): Promise<GameBoardPositionEntity>
}