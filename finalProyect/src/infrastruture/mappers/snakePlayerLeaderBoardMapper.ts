import SnakePlayerLeaderBoard from '../entities/snakePlayerLeaderBoard'
import SnakePlayerLeaderBoardEntity from '../../applicationCore/entities/snakePlayerLeaderboardEntity'
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SnakePlayerLeaderBoardMapper {
  static castToDomainEntitiy (snakePlayerLeaderBoard: SnakePlayerLeaderBoard): SnakePlayerLeaderBoardEntity {
    const snakePlayerLeaderBoardEntity: SnakePlayerLeaderBoardEntity = new SnakePlayerLeaderBoardEntity(snakePlayerLeaderBoard.id, snakePlayerLeaderBoard.playerId,
      snakePlayerLeaderBoard.name, snakePlayerLeaderBoard.score)
    return snakePlayerLeaderBoardEntity
  }
}
