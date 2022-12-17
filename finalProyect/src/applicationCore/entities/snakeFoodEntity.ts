import { BoardPositionType } from '../types.ts/types';
import GameBoardPositionEntity from "./gameBoardPositionEntity";

export default class SnakeFoodEntity extends GameBoardPositionEntity {
  constructor(playedId: number, positionId: number, boardPositionType:BoardPositionType, xPosition: number, yPosition: number) {
    super(playedId, positionId, boardPositionType, xPosition, yPosition);
  }
}
