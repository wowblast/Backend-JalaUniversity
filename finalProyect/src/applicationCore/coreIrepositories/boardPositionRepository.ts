import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';

export interface IBoardPositionRepository {
    CreateBoard(size: number):Promise<GameBoardPositionEntity[]>
    GetAllPositions(): Promise<GameBoardPositionEntity[]>
    ClearBoard(): Promise<void>
}