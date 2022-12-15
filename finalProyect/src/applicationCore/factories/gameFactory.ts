import GameEntity from '../entities/gameEntity';
import { GameStatusStates, GameStatus } from '../types.ts/types';
export default class GameFactory {
    static CreateGame(interval: number, boardSize: number) {
        return new GameEntity(GameStatusStates.ReadyState as GameStatus, interval,boardSize  )
    }
}