import GameEntity from '../entities/gameEntity';
import { GameStatusStates, GameStatus } from '../types.ts/types';
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class GameFactory {
  static CreateGame (id: number, interval: number, boardSize: number): GameEntity {
    return new GameEntity(id, GameStatusStates.ReadyState as GameStatus, interval, boardSize);
  }
}
