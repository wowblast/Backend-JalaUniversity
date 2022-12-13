import { PositionType } from '../types.ts/types';
import SnakePlayerEntity from '../entities/snakePlayerEntity';
export interface ISnakePlayerService {
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, positionType:PositionType): SnakePlayerEntity    
    //GetS(id: number): [SnakePlayer]
    ChangeSnakePlayerDirecction(id: number): SnakePlayerEntity
    
}