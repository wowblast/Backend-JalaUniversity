import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import SnakePlayerEntity from '../entities/snakePlayerEntity';

export interface ISnakePositionRepository {
    MoveSnakeForwards(id: number): Promise<Boolean>
    GetSnakePositions(id: number): Promise<GameBoardPositionEntity[]>
    RemoveSnake(): Promise<void>
    StartAutoMovemenvent(): Promise<void>
    CreateSnakePlayer(snakePlayerEntity: SnakePlayerEntity,  size: number): Promise<GameBoardPositionEntity>
}