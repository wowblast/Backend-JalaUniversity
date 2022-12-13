import { BoardFill } from '../types.ts/types';
import SnakePlayer from '../entities/snakePlayer';
export interface ISnakePlayerService {
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, boardFill: BoardFill): SnakePlayer    
    MoveSnakePlayerForwards(id: number): [SnakePlayer]
    ChangeSnakePlayerDirecction(id: number): SnakePlayer
    
}