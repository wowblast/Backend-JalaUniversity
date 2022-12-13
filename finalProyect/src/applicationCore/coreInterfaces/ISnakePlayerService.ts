import SnakePlayer from '../entities/gameBoardPositionEntity';
import { PositionType } from '../types.ts/types';
export interface ISnakePlayerService {
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, positionType:PositionType): SnakePlayer    
    //GetS(id: number): [SnakePlayer]
    ChangeSnakePlayerDirecction(id: number): SnakePlayer
    
}