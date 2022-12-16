import GameEntity from '../entities/gameEntity';
export interface IGameService {
    CreateGame(boardSize: number, interval: number): Promise<void>
    GetGameStatus(): Promise<GameEntity>
    EndGame(): Promise<GameEntity>
    RestartGame(): Promise<GameEntity>
}