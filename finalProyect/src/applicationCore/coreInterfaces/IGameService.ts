import { Status } from '../types.ts/types';
export interface IGameService {
    StartGame(size: number): void
    GetGameStatus(): Status
    SetGameStatus(status :Status): void
    EndGame(): Status
    RestartGame(): Status
}