import GameEntity from '../entities/gameEntity';
export interface GameService {
    CreateGame(boardSize: number, interval: number): Promise<void>
    GetGameStatus(): Promise<GameEntity>
    EndGame(): Promise<void>
    RestartGame(): Promise<void>
    StartAutoMovemenvent(): Promise<void>
    StopAutoMovemenvent(): Promise<void>   
}