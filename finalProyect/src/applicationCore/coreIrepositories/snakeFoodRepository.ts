import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';

export interface ISnakeFoodRepository {
    CreateSnakeFood(): GameBoardPositionEntity
    ConsumeFood(playerId: number, score: number): GameBoardPositionEntity
}