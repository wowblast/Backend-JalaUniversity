import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
export interface IBoardPositionService {
    GetAllPositions(): Promise<GameBoardPositionEntity[]>
    ClearBoard(): Promise<GameBoardPositionEntity[]>
    CreateBoard(size: number):Promise<void>
}