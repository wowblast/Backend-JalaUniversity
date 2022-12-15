import SnakePlayerEntity from '../entities/snakePlayerEntity';
export interface ISnakePlayerService {
    CreateSnakePlayer(playerId: number): Promise<SnakePlayerEntity>
    ChangeSnakePlayerDirecction(playerId: number): Promise<SnakePlayerEntity>    
}