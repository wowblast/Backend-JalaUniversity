import { Direction, PositionType } from '../types.ts/types';
import BoardPosition from './boardPosition';
export default class GameBoardPositionEntity extends BoardPosition {  
  private positionId: number
  constructor(positionId: number, positionType:PositionType, xPosition: number, yPosition: number) {
    super(positionType,xPosition,yPosition);
    this.positionId = positionId   
}  
  getPositionId(): number {
    return this.positionId
  } 
   
}