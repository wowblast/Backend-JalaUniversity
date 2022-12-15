import SnakeFoodEntity from '../entities/snakeFoodEntity';
import { BoardPositionTypesList, BoardPositionType } from '../types.ts/types';

export default class SnakeFoodFactory {
    static CreateSnakeFood(xPosition: number, yPosition: number) {
        return new SnakeFoodEntity(BoardPositionTypesList.Food as BoardPositionType, xPosition, yPosition )
    }
}