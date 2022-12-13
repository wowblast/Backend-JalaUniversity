import { Status } from '../types.ts/types';
export interface IBoardService {
    CreateGame(): void
    GetGameStatus(): Status
    EndGame(): void
    RestartGame(): void
}