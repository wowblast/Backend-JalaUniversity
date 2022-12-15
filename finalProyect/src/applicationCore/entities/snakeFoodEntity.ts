import BoardPosition from "./boardPosition";
import { BoardPositionType } from '../types.ts/types';

export default class SnakeFoodEntity extends BoardPosition {
  constructor(boardPositionType: BoardPositionType, xPosition: number, yPosition: number) {
    super(boardPositionType, xPosition, yPosition);
  }
}
