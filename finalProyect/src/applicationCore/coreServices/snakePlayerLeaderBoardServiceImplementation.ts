import { SnakePlayerLeaderBoardService } from '../coreInterfaces/SnakePlayerLeaderboard';
import SnakePlayerEntity from '../entities/snakePlayerEntity';
import SnakePlayerLeaderBoardEntity from '../entities/snakePlayerLeaderboardEntity';
import { inject, injectable } from 'inversify';
import { SnakePlayerLeaderBoardRepository } from '../coreIrepositories/snakePlayerLeaderBoardRepository';
import { SnakePlayerLeaderBoarRepositoryIdentifier } from '../types.ts/inversifyTypes';
import { DefaultTopScores } from '../types.ts/gameConfigs';
@injectable()
export default class SnakePlayerLeaderBoardServiceImplementation implements SnakePlayerLeaderBoardService {
  private readonly snakePlayerLeaderBoardRepository: SnakePlayerLeaderBoardRepository;

  constructor (@inject(SnakePlayerLeaderBoarRepositoryIdentifier) snakePlayerLeaderBoardRepository: SnakePlayerLeaderBoardRepository) {
    this.snakePlayerLeaderBoardRepository = snakePlayerLeaderBoardRepository;
  }

  async InsertSnakePlayerOnLeaderBoardIfTopScore (snakePlayer: SnakePlayerEntity): Promise<void> {
    const currentTopScores: SnakePlayerLeaderBoardEntity[] = await this.GetSnakePlayerLeaderBoard();
    currentTopScores.length < DefaultTopScores ? await this.insertSnakePlayerOnLeaderBoard(snakePlayer) : await this.replaceLastTopScore(snakePlayer, currentTopScores);
  }

  async RemoveSnakePlayerFromLeaderBoard (snakePlayer: SnakePlayerLeaderBoardEntity): Promise<void> {
    await this.snakePlayerLeaderBoardRepository.RemoveSnakePlayerFromLeaderBoard(snakePlayer);
  }

  async GetSnakePlayerLeaderBoard (): Promise<SnakePlayerLeaderBoardEntity[]> {
    return await this.snakePlayerLeaderBoardRepository.GetSnakePlayerLeaderBoard();
  }

  async insertSnakePlayerOnLeaderBoard (snakePlayer: SnakePlayerEntity): Promise<void> {
    await this.snakePlayerLeaderBoardRepository.InsertSnakePlayerOnLeaderBoard(snakePlayer);
  }

  async replaceLastTopScore (snakePlayer: SnakePlayerEntity, currentTopScores: SnakePlayerLeaderBoardEntity[]): Promise<void> {
    const sortedScoresByBestScores = this.sortTopScoresByBestScores(currentTopScores);
    await this.RemoveSnakePlayerFromLeaderBoard(sortedScoresByBestScores[sortedScoresByBestScores.length - 1]);
    await this.insertSnakePlayerOnLeaderBoard(snakePlayer);
  }

  sortTopScoresByBestScores (currentTopScores: SnakePlayerLeaderBoardEntity[]): SnakePlayerLeaderBoardEntity[] {
    return currentTopScores.sort((beforeScore, afterScore) => beforeScore.getScore() < afterScore.getScore() ? -1 : afterScore.getScore() < beforeScore.getScore() ? 1 : 0);
  }
}
