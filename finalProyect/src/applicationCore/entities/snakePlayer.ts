import { Direction, BoardFill } from '../types.ts/types';
import BoardPosition from './boardPosition';
export default class SnakePlayer extends BoardPosition {  
  private playerId: number
  private size: number
  private direction: Direction
  constructor(playerId: number, size: number, direction: Direction, boardFill:BoardFill, xPosition: number, yPosition: number) {
    super(boardFill,xPosition,yPosition);
    this.playerId = playerId
    this.size = size
    this.direction =direction
}  
  getPlayerId(): number {
    return this.playerId
  }
  getSize(): number {
    return this.size
  }
  setSize(size: number) {
    this.size = size
  }
  getDirection(): Direction {
    return this.direction
  }
  setDirection(direction: Direction) {
    this.direction = direction
  }

   
}