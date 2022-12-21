import SnakePlayerEntity from '../entities/snakePlayerEntity'
import SnakePlayerLeaderBoardEntity from '../entities/snakePlayerLeaderboardEntity'

export interface SnakePlayerLeaderBoardRepository {
  InsertSnakePlayerOnLeaderBoard: (snakePlayer: SnakePlayerEntity) => Promise<void>
  RemoveSnakePlayerFromLeaderBoard: (snakePlayerLeaderBoardEntity: SnakePlayerLeaderBoardEntity) => Promise<void>
  GetSnakePlayerLeaderBoard: () => Promise<SnakePlayerLeaderBoardEntity[]>
}
