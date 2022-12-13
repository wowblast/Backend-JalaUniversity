import SnakeFood from '../entities/snakeFood';
export interface ISnakeFoodService {
    CreateSnakeFood(xPosition: number, yPosition: number): SnakeFood
    //SetNewSnakeFoodPosition(xPosition: number, yPosition: number): SnakeFood
}