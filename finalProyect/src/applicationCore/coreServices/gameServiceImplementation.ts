import { inject, injectable } from 'inversify';
import { GameService } from '../coreInterfaces/GameService';
import GameEntity from '../entities/gameEntity';
import { BoardPositionService } from '../coreInterfaces/BoardPositionService';
import { BoardPositionServiceID, GameRepositoryID, SnakePlayerServiceIdentifier } from '../types.ts/inversifyTypes';
import GameRepository from '../coreIrepositories/gameRepository';
import GameFactory from '../factories/gameFactory';
import { DefaultGameID } from '../types.ts/gameConfigs';
import { SnakePlayerService } from '../coreInterfaces/SnakePlayerService';

@injectable()
export default class GameServiceImplementation implements GameService {

    private boardPositionService: BoardPositionService
    private gameRepository: GameRepository
    private snakePlayerService: SnakePlayerService
    constructor(@inject(BoardPositionServiceID)boardPositionService: BoardPositionService,
      @inject(GameRepositoryID) gameRepository:  GameRepository, @inject(SnakePlayerServiceIdentifier) snakePlayerService:SnakePlayerService ) {
        this.boardPositionService = boardPositionService
        this.gameRepository = gameRepository
        this.snakePlayerService =snakePlayerService
    }
    async CreateGame(boardSize: number, interval: number): Promise<void> {
        const gameInstance: GameEntity = GameFactory.CreateGame(DefaultGameID, interval, boardSize )
        await this.gameRepository.InsertGameInstance(gameInstance)
        await this.createBoard(boardSize)
        await this.createFoodOnBoard()

    }
    async GetGameStatus(): Promise<GameEntity> {
        return

    }
    async EndGame(): Promise<GameEntity> {
        return

    }
    async RestartGame(): Promise<GameEntity> {
        return
    }

    async createFoodOnBoard(): Promise<void> {
        this.snakePlayerService.InsertSnakeFoodOnBoard()
    }

    async createBoard(boardSize: number): Promise<void>  {
        await this.boardPositionService.CreateBoard(boardSize)
    }

}