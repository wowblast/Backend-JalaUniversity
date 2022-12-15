import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import SnakePlayerEntity from '../entities/snakePlayerEntity';
import { SnakeDirection } from '../types.ts/types';

export interface ISnakePositionRepository {
    MoveSnakeForwards(playerId: number, snakeDirection: SnakeDirection): Promise<Boolean>
    GetSnakePositions(playerId: number): Promise<GameBoardPositionEntity[]>
    RemoveSnake(): Promise<void>
    StartAutoMovemenvent(): Promise<void>
    CreateSnakePlayer(snakePlayerEntity: SnakePlayerEntity,  snakeBodySize: number): Promise<GameBoardPositionEntity>
    CreateSnakeBody(playerId: number): Promise<GameBoardPositionEntity[]>
    
}