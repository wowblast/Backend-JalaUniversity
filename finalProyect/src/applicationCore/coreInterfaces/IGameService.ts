import { GameStatus } from '../types.ts/types';
import GameEntity from '../entities/gameEntity';
export interface IGameService {
    StartGame(boardSize: number): GameEntity
    GetGameStatus(): GameStatus
    SetGameStatus(gameStatus :GameStatus): void
    EndGame(): GameStatus
    RestartGame(): GameStatus
}