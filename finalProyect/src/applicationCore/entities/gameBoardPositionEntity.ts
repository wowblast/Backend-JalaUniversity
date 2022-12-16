import { injectable } from 'inversify';
import { BoardPositionType } from '../types.ts/types';
import BoardPosition from './boardPosition';

@injectable()
export default class GameBoardPositionEntity extends BoardPosition {  
  private positionId: number
  private playedId: number
  constructor(playedId: number, positionId: number, BoardPositionType:BoardPositionType, xPosition: number, yPosition: number) {
    super(BoardPositionType,xPosition,yPosition);
    this.positionId = positionId   
}  
  getPositionId(): number {
    return this.positionId
  } 

  getPlayerId(): number {
    return this.playedId
  }

  setPlayerId(playedId: number) {
    this.playedId = playedId
  }   
}