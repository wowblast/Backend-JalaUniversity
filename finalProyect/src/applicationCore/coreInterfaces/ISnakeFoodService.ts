import { PositionType } from '../types.ts/types';
import SnakeFoodEntity from '../entities/snakeFoodEntity';
export interface ISnakeFoodService {
    CreateSnakeFood(xPosition: number, yPosition: number, positionType:PositionType): SnakeFoodEntity
    //SetNewSnakeFoodPosition(xPosition: number, yPosition: number): SnakeFood
}