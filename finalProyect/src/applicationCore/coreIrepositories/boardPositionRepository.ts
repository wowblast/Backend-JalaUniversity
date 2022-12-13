import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { PositionType } from '../types.ts/types';

export interface IBoardPositionRepository {
    CreateBoard(size: number):Promise<void>
    GetAllPositions(): Promise<GameBoardPositionEntity[]>
    ClearBoard(): Promise<GameBoardPositionEntity[]>
}