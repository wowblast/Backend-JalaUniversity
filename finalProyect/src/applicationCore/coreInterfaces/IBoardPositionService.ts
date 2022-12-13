import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { PositionType } from '../types.ts/types';
export interface IBoardPositionService {
    MoveSnakePlayer(id: number): GameBoardPositionEntity[]
    GetAllPosition(id: number): GameBoardPositionEntity[]
    StartAutoMovemenvent(): void
    ClearBoard(): GameBoardPositionEntity[]
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, positionType:PositionType): GameBoardPositionEntity   
    CreateBoard(size: number):GameBoardPositionEntity[]
}