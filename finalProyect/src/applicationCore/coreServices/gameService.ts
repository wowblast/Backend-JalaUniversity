import { inject, injectable } from 'inversify';
import { IGameService } from '../coreInterfaces/IGameService';
import GameEntity from '../entities/gameEntity';
import { IBoardPositionService } from '../coreInterfaces/IBoardPositionService';
import { BoardPositionServiceID, GameRepositoryID } from '../types.ts/inversifyTypes';
import GameRepository from '../coreIrepositories/gameRepository';
import GameFactory from '../factories/gameFactory';
import { DefaultGameID } from '../types.ts/gameConfigs';

@injectable()
export default class GameService implements IGameService {

    private boardPositionService: IBoardPositionService
    private gameRepository: GameRepository
    constructor(@inject(BoardPositionServiceID)boardPositionService: IBoardPositionService,
      @inject(GameRepositoryID) gameRepository:  GameRepository ) {
        this.boardPositionService = boardPositionService
        this.gameRepository = gameRepository
    }
    async CreateGame(boardSize: number, interval: number): Promise<void> {
        const gameInstance: GameEntity = GameFactory.CreateGame(DefaultGameID, interval, boardSize )
        await this.gameRepository.InsertGameInstance(gameInstance)
        await this.boardPositionService.CreateBoard(boardSize)        

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

}