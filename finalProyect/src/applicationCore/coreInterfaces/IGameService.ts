import { Status } from '../types.ts/types';
import GameEntity from '../entities/gameEntity';
export interface IGameService {
    StartGame(size: number): GameEntity
    GetGameStatus(): Status
    SetGameStatus(status :Status): void
    EndGame(): Status
    RestartGame(): Status
}