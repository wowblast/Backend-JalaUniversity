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

    private boardPositionService: BoardPositionService
    private gameRepository: GameRepository
    private snakePlayerService: SnakePlayerService
    private intervalIdentifier: NodeJS.Timer
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

    async StartAutoMovemenvent(): Promise<void> {
        const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID)

        this.intervalIdentifier = setInterval(async () => {
            const snakeHeads: GameBoardPositionEntity[] = await this.boardPositionService.GetAllSnakeHeads()
            console.log("Playing")    
            await this.delay(1000)
        
            await this.updateGamestatus('Playing')
            snakeHeads.forEach(async (snake) => {
                await this.snakePlayerService.MoveSnakeForward(snake.getPlayerId(), snake.getSnakeDirection())

            })
            await this.delay(1000)
            await this.updateGamestatus('Ready')
            console.log("Ready")
            await this.snakePlayerService.PrintBoardOnConsole()
            await this.delay(2000)

            
        }, gameInstance.getStepIntervalBySeconds()*1000);

    }
    async StopAutoMovemenvent(): Promise<void> {
        clearInterval(this.intervalIdentifier)
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async updateGamestatus(status: GameStatus): Promise<void> {
        const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID)
        gameInstance.setStatus(status)
        await this.gameRepository.UpdateGameInstance(gameInstance)
    }

}