import { inject, injectable } from 'inversify';
import { GameService } from '../coreInterfaces/GameService';
import GameEntity from '../entities/gameEntity';
import { BoardPositionService } from '../coreInterfaces/BoardPositionService';
import { BoardPositionServiceID, GameRepositoryID, SnakePlayerServiceIdentifier } from '../types.ts/inversifyTypes';
import GameRepository from '../coreIrepositories/gameRepository';
import GameFactory from '../factories/gameFactory';
import { DefaultGameID } from '../types.ts/gameConfigs';
import { SnakePlayerService } from '../coreInterfaces/SnakePlayerService';
import { GameStatus } from '../types.ts/types';
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';

@injectable()
export default class GameServiceImplementation implements GameService {
  private readonly boardPositionService: BoardPositionService;
  private readonly gameRepository: GameRepository;
  private readonly snakePlayerService: SnakePlayerService;
  private intervalIdentifier: NodeJS.Timer;
  constructor (@inject(BoardPositionServiceID)boardPositionService: BoardPositionService,
    @inject(GameRepositoryID) gameRepository: GameRepository, @inject(SnakePlayerServiceIdentifier) snakePlayerService: SnakePlayerService) {
    this.boardPositionService = boardPositionService;
    this.gameRepository = gameRepository;
    this.snakePlayerService = snakePlayerService;
  }

  async CreateGame (boardSize: number, interval: number): Promise<void> {
    const gameInstance: GameEntity = GameFactory.CreateGame(DefaultGameID, interval, boardSize);
    await this.gameRepository.InsertGameInstance(gameInstance);
    await this.createBoard(boardSize);
    await this.createFoodOnBoard();
  }

  async GetGameStatus (): Promise<GameEntity> {
    return await this.gameRepository.GetGameInstance(DefaultGameID);
  }

  async EndGame (): Promise<void> {
    await this.updateGamestatus('Ended');
  }

  async RestartGame (): Promise<void> {
    const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(1);
    const boardSize = gameInstance.getBoardSize();
    await this.boardPositionService.CreateBoard(boardSize);
    await this.updateGamestatus('Ready');
  }

  async createFoodOnBoard (): Promise<void> {
    await this.snakePlayerService.InsertSnakeFoodOnBoard();
  }

  async createBoard (boardSize: number): Promise<void> {
    await this.boardPositionService.CreateBoard(boardSize);
  }

  async StartAutoMovemenvent (): Promise<void> {
    const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.intervalIdentifier = setInterval(async () => {
      const snakeHeads: GameBoardPositionEntity[] = await this.boardPositionService.GetAllSnakeHeads();
      console.log('Playing');
      await this.updateGamestatus('Playing');
      for (let index = 0; index < snakeHeads.length; index++) {
        const isMoved = await this.snakePlayerService.MoveSnakeForward(snakeHeads[index].getPlayerId(), snakeHeads[index].getSnakeDirection());
        !isMoved && this.StopAutoMovemenvent();        
      }
      await this.updateGamestatus('Ready');
      await this.snakePlayerService.PrintBoardOnConsole();
      console.log('Ready');
      await this.delay( gameInstance.getStepIntervalBySeconds() * 1000);
    }, gameInstance.getStepIntervalBySeconds() * 1000);
  }

  async StopAutoMovemenvent (): Promise<void> {
    clearInterval(this.intervalIdentifier);
    await this.EndGame();
  }

  async delay (ms: number): Promise<NodeJS.Timeout> {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  async updateGamestatus (status: GameStatus): Promise<void> {
    const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID);
    gameInstance.setStatus(status);
    await this.gameRepository.UpdateGameInstance(gameInstance);
  }
}
