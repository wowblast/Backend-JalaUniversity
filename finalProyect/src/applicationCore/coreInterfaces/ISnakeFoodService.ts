import { BoardPositionType } from '../types.ts/types';
import SnakeFoodEntity from '../entities/snakeFoodEntity';
export interface ISnakeFoodService {
    CreateSnakeFood(xPosition: number, yPosition: number, boardPositionType: BoardPositionType): SnakeFoodEntity
}