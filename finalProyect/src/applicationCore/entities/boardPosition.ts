import { PositionType } from '../types.ts/types';
import Position from './position';
export default class BoardPosition extends Position { 
  private positionType: PositionType
  constructor(positionType: PositionType, xPosition: number, yPosition: number) {
        super(xPosition,yPosition);
        this.positionType = positionType
    }
  getPositionType(): PositionType {
    return this.positionType
  }

  setPositionType(positionType: PositionType) {    
    this.positionType = positionType
  }

  
}