import GameEntity from '../entities/gameEntity';
export interface GameService {
    CreateGame(boardSize: number, interval: number): Promise<void>
    GetGameStatus(): Promise<GameEntity>
    EndGame(): Promise<GameEntity>
    RestartGame(): Promise<GameEntity>
    StartAutoMovemenvent(): Promise<void>
    StopAutoMovemenvent(): Promise<void>   
}