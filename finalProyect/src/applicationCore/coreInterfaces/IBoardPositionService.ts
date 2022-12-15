import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
export interface IBoardPositionService {
    GetAllPositions(): Promise<GameBoardPositionEntity[]>
    ClearBoard(): Promise<void>
    CreateBoard(size: number):Promise<GameBoardPositionEntity[]>
}