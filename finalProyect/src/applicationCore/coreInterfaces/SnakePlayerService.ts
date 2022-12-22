import SnakePlayerEntity from '../entities/snakePlayerEntity';
export interface SnakePlayerService {
  CreateSnakePlayer: (id: number, name: string, snakeDirection: string) => Promise<SnakePlayerEntity>
  UpdateSnakePlayerDirecction: (id: number, snakeDirection: string) => Promise<SnakePlayerEntity>
  UpdateSnakePlayerName: (id: number, name: string) => Promise<SnakePlayerEntity>
  MoveSnakeForward: (id: number, snakeDirection: string) => Promise<boolean>
  InsertSnakeFoodOnBoard: () => Promise<void>
  PrintBoardOnConsole: () => Promise<void>
}
