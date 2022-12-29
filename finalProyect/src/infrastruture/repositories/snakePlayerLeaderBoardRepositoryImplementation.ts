import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import SnakePlayerLeaderBoardEntity from '../../applicationCore/entities/snakePlayerLeaderboardEntity';
import { MongoRepository } from 'typeorm';
import { SnakePlayerLeaderBoardRepository } from '../../applicationCore/coreIrepositories/snakePlayerLeaderBoardRepository';
import { AppDataSource } from '../data-source';
import SnakePlayerLeaderBoard from '../entities/snakePlayerLeaderBoard';
import SnakePlayerLeaderBoardMapper from '../mappers/snakePlayerLeaderBoardMapper';
import { injectable } from 'inversify';

@injectable()
export default class SnakePlayerLeaderBoardRepositoryImplementation implements SnakePlayerLeaderBoardRepository {
  private repository: MongoRepository<SnakePlayerLeaderBoard>;

  constructor () {
    this.repository = AppDataSource.getMongoRepository(SnakePlayerLeaderBoard);
  }

  setRepository (repository: MongoRepository<SnakePlayerLeaderBoard>): void {
    this.repository = repository;
  }

  async InsertSnakePlayerOnLeaderBoard (snakePlayer: SnakePlayerEntity): Promise<void> {
    const lastScore = await this.repository.find({});
    const snakePlayerLeaderBoard: SnakePlayerLeaderBoard = new SnakePlayerLeaderBoard();
    snakePlayerLeaderBoard.name = snakePlayer.getName();
    snakePlayerLeaderBoard.playerId = snakePlayer.getPLayerId();
    snakePlayerLeaderBoard.score = snakePlayer.getScore();
    snakePlayerLeaderBoard.id = 1 + lastScore.length;
    await this.repository.save(snakePlayerLeaderBoard);
  }

  async RemoveSnakePlayerFromLeaderBoard (snakePlayerLeaderBoardEntity: SnakePlayerLeaderBoardEntity): Promise<void> {
    await this.repository.delete({ id: snakePlayerLeaderBoardEntity.getId() });
  }

  async GetSnakePlayerLeaderBoard (): Promise<SnakePlayerLeaderBoardEntity[]> {
    const results = await this.repository.find();
    return results.map(SnakePlayerLeaderBoardMapper.castToDomainEntitiy);
  }
}
