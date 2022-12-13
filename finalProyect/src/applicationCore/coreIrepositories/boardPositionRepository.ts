import BoardPosition from '../entities/boardPosition';
import { PositionType } from '../types.ts/types';

export interface IBoardPositionRepository {
    CreateBoard(size: number):BoardPosition[]
    MoveSnakeForwars(id: number): BoardPosition
    GetAllPositions(): BoardPosition[]
    ClearBoard(): BoardPosition[]
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, positionType:PositionType): BoardPosition    
}