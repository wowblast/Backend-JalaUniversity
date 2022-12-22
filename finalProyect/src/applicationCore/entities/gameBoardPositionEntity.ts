import { injectable } from 'inversify';
import { BoardPositionType, SnakeDirection } from '../types.ts/types';
import BoardPosition from './boardPosition';

@injectable()
export default class GameBoardPositionEntity extends BoardPosition {
  private readonly positionId: number;
  private playedId: number;
  private snakeBodyIdentifier: number;
  private snakeDirection: SnakeDirection;
  constructor (playedId: number, positionId: number, snakeBodyIdentifier: number, boardPositionType: BoardPositionType, xPosition: number, yPosition: number, snakeDirection: SnakeDirection) {
    super(boardPositionType, xPosition, yPosition);
    this.positionId = positionId;
    this.playedId = playedId;
    this.snakeBodyIdentifier = snakeBodyIdentifier;
    this.snakeDirection = snakeDirection;
  }

  getPositionId (): number {
    return this.positionId;
  }

  getPlayerId (): number {
    return this.playedId;
  }

  setPlayerId (playedId: number): void {
    this.playedId = playedId;
  }

  getSnakeBodyIdentifier (): number {
    return this.snakeBodyIdentifier;
  }

  setSnakeBodyIdentifier (snakeBodyIdentifier: number): void {
    this.snakeBodyIdentifier = snakeBodyIdentifier;
  }

  getSnakeDirection (): SnakeDirection {
    return this.snakeDirection;
  }

  setSnakeDirection (snakeDirection: SnakeDirection): void {
    this.snakeDirection = snakeDirection;
  }
}
