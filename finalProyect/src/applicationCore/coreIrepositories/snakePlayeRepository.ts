import SnakePlayerEntity from '../entities/snakePlayerEntity';

export interface SnakePlayerRepository {
  InsertSnakePlayer: (snakePlayerEntity: SnakePlayerEntity) => Promise<void>
  UpdateSnakePlayer: (
    snakePlayerEntity: SnakePlayerEntity
  ) => Promise<SnakePlayerEntity>
  DeleteSnakePlayer: (playerId: number) => Promise<void>

  GetSnakePlayer: (playerId: number) => Promise<SnakePlayerEntity>
}
