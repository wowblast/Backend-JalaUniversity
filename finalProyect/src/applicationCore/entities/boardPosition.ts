import { BoardFill } from '../types.ts/types';
import Position from './position';
export default class BoardPosition extends Position { 
  private boardFill: BoardFill   
  constructor(boardfill: BoardFill, xPosition: number, yPosition: number) {
        super(xPosition,yPosition);
        this.boardFill = boardfill
    }
  getboardfillPosition(): BoardFill {
    return this.boardFill
  }

  setboardfillPosition(boardFill: BoardFill) {    
    this.boardFill = boardFill
  }

  
}