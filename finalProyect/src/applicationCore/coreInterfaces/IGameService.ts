import { GameStatus } from '../types.ts/types';
import GameEntity from '../entities/gameEntity';
export interface IGameService {
    CreateGame(boardSize: number): GameEntity
    GetGameStatus(): GameStatus
    UpdateGameStatus(gameStatus :GameStatus): void
    EndGame(): GameStatus
    RestartGame(): GameStatus
}