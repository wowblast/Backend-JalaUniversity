import { SnakeDirection } from '../types.ts/types';

export default class SnakePlayerEntity {
  private playerId: number;
  private name: string;
  private snakeDirection: SnakeDirection;
  private score: number;
  private snakeSize: number;
  constructor (playerId: number, name: string, snakeDirection: SnakeDirection, score: number, snakeSize: number) {
    this.playerId = playerId;
    this.name = name;
    this.snakeDirection = snakeDirection;
    this.score = score;
    this.snakeSize = snakeSize;
  }

  getPLayerId (): number {
    return this.playerId;
  }

  setPlayerId (playerId: number): void {
    this.playerId = playerId;
  }

  getName (): string {
    return this.name;
  }

  setName (name: string): void {
    this.name = name;
  }

  getSnakeDirection (): SnakeDirection {
    return this.snakeDirection;
  }

  setSnakeDirection (snakeDirection: SnakeDirection): void {
    this.snakeDirection = snakeDirection;
  }

  getScore (): number {
    return this.score;
  }

  setScore (score: number): void {
    this.score = score;
  }

  getSnakeSize (): number {
    return this.snakeSize;
  }

  setSnakeSize (snakeSize: number): void {
    this.snakeSize = snakeSize;
  }
}
