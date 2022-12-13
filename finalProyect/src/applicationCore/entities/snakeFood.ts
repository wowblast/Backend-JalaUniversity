import { BoardFill } from "../types.ts/types";
import BoardPosition from "./boardPosition";
export default class SnakeFood extends BoardPosition {
  constructor(boardFill: BoardFill, xPosition: number, yPosition: number) {
    super(boardFill, xPosition, yPosition);
  }
}
