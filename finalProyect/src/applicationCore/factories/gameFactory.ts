import GameEntity from '../entities/gameEntity';
import { GameStatusStates, GameStatus } from '../types.ts/types';
export default class GameFactory {
    static CreateGame(id: number, interval: number, boardSize: number) {
        return new GameEntity(id, GameStatusStates.ReadyState as GameStatus, interval,boardSize  )
    }
}