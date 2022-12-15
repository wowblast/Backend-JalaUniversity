import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import SnakePlayerEntity from '../entities/snakePlayerEntity';
import { SnakeDirection } from '../types.ts/types';

export interface ISnakePlayerRepository {
    CreateSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<Boolean>
    ChangeSnakePlayerDirecction(id: number, snakeDirection: SnakeDirection): GameBoardPositionEntity
    RemoveSnake(playerId: number): Promise<void>    
}