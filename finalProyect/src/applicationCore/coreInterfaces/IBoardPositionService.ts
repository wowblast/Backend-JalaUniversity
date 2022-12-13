import SnakePlayer from '../entities/snakePlayerEntity';
import BoardPosition from '../entities/boardPosition';
import { PositionType } from '../types.ts/types';
export interface IBoardPositionService {
    MoveSnakePlayer(id: number): BoardPosition[]
    GetAllPosition(id: number): BoardPosition[]
    StartAutoMovemenvent(): void
    ClearBoard(): BoardPosition[]
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, positionType:PositionType): BoardPosition   
    CreateBoard(size: number):BoardPosition[]
}