import { BoardPositionType } from '../types.ts/types';
import Position from './position';
export default class BoardPosition extends Position {
  private boardPositionType: BoardPositionType;
  constructor (boardPositionType: BoardPositionType, xPosition: number, yPosition: number) {
    super(xPosition, yPosition);
    this.boardPositionType = boardPositionType;
  }

  getBoardPositionType (): BoardPositionType {
    return this.boardPositionType;
  }

  setBoardPositionType (boardPositionType: BoardPositionType): void {
    this.boardPositionType = boardPositionType;
  }
}
