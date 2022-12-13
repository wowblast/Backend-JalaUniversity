import { PositionType } from "../types.ts/types";
import BoardPosition from "./boardPosition";
export default class SnakeFoodEntity extends BoardPosition {
  constructor(boardFill: PositionType, xPosition: number, yPosition: number) {
    super(boardFill, xPosition, yPosition);
  }
}
