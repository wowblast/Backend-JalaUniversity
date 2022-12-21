import SnakePlayerEntity from '../entities/snakePlayerEntity';
import SnakePlayerLeaderBoardEntity from '../entities/snakePlayerLeaderboardEntity';

export interface SnakePlayerLeaderBoardService {
    InsertSnakePlayerOnLeaderBoardIfTopScore(snakePlayer: SnakePlayerEntity): Promise<void>
    RemoveSnakePlayerFromLeaderBoard(snakePlayer: SnakePlayerLeaderBoardEntity): Promise<void> 
    GetSnakePlayerLeaderBoard(): Promise<SnakePlayerLeaderBoardEntity[]>
}