import SnakeFood from '../entities/snakeFoodEntity';
import { PositionType } from '../types.ts/types';
export interface ISnakeFoodService {
    CreateSnakeFood(xPosition: number, yPosition: number, positionType:PositionType): SnakeFood
    //SetNewSnakeFoodPosition(xPosition: number, yPosition: number): SnakeFood
}