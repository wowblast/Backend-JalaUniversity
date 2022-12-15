import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';

export interface IBoardPositionRepository {
    CreateBoard(boardSize: number):Promise<GameBoardPositionEntity[]>
    GetAllPositions(): Promise<GameBoardPositionEntity[]>
    ClearBoard(): Promise<void>
    InsertPointOnBoard(gameBoardPositionEntity: GameBoardPositionEntity): Promise<void>
}