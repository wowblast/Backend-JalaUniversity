import { GameStatus } from '../types.ts/types';
import Board from './board';
export default class GameEntity extends Board {
  private gameStatus: GameStatus;
  private stepIntervalBySeconds: number;
  private id: number;
  constructor (
    id: number, gameStatus: GameStatus, stepIntervalBySeconds: number, boardSize: number
  ) {
    super(boardSize);
    this.id = id;
    this.stepIntervalBySeconds = stepIntervalBySeconds;
    this.gameStatus = gameStatus;
  }

  getId (): number {
    return this.id;
  }

  setId (id: number): void {
    this.id = id;
  }

  getStatus (): GameStatus {
    return this.gameStatus;
  }

  setStatus (gameStatus: GameStatus): void {
    this.gameStatus = gameStatus;
  }

  getStepIntervalBySeconds (): number {
    return this.stepIntervalBySeconds;
  }

  setStepIntervalBySeconds (stepIntervalBySeconds: number): void {
    this.stepIntervalBySeconds = stepIntervalBySeconds;
  }
}
