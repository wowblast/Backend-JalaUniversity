import SnakePlayerEntity from '../entities/snakePlayerEntity';
import SnakePlayerLeaderBoardEntity from '../entities/snakePlayerLeaderboardEntity';

export interface SnakePlayerLeaderBoardService {
    InsertSnakePlayerOnLeaderBoard(snakePlayer: SnakePlayerEntity): Promise<void>
    RemoveSnakePlayerFromLeaderBoard(snakePlayer: SnakePlayerEntity): Promise<void> 
    GetSnakePlayerLeaderBoard(): Promise<SnakePlayerLeaderBoardEntity[]>
}