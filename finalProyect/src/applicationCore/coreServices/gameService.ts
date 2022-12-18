import { inject, injectable } from 'inversify';
import { IGameService } from '../coreInterfaces/IGameService';
import GameEntity from '../entities/gameEntity';
import { IBoardPositionService } from '../coreInterfaces/IBoardPositionService';
import { BoardPositionServiceID, GameRepositoryID, SnakePlayerServiceIdentifier } from '../types.ts/inversifyTypes';
import GameRepository from '../coreIrepositories/gameRepository';
import GameFactory from '../factories/gameFactory';
import { DefaultGameID } from '../types.ts/gameConfigs';
import { ISnakePlayerService } from '../coreInterfaces/ISnakePlayerService';

@injectable()
export default class GameService implements IGameService {

    private boardPositionService: IBoardPositionService
    private gameRepository: GameRepository
    private snakePlayerService: ISnakePlayerService
    constructor(@inject(BoardPositionServiceID)boardPositionService: IBoardPositionService,
      @inject(GameRepositoryID) gameRepository:  GameRepository, @inject(SnakePlayerServiceIdentifier) snakePlayerService:ISnakePlayerService ) {
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