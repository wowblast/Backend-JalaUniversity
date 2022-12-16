import SnakePlayerEntity from '../entities/snakePlayerEntity';
export interface ISnakePlayerService {
    CreateSnakePlayer(id: number, name: string, snakeDirection: string): Promise<SnakePlayerEntity> 
    UpdateSnakePlayerDirecction(id: number, snakeDirection: string): Promise<SnakePlayerEntity> 
    UpdateSnakePlayerName(id: number, name: string): Promise<SnakePlayerEntity> 
}