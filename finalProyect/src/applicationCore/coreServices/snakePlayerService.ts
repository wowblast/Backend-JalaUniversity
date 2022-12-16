import { inject, injectable } from "inversify"
import { ISnakePlayerService } from "../coreInterfaces/ISnakePlayerService"
import SnakePlayerEntity from "../entities/snakePlayerEntity"
import { ISnakePlayerRepository } from '../coreIrepositories/snakePlayeRepository';
import { SnakePlayerRepositoryID, BoardPositionReposioryID, GameRepositoryID } from '../types.ts/inversifyTypes';
import SnakePlayerFactory from '../factories/SnakePlayerFactory';
import BoardPositionRepository from '../../infrastruture/repositories/boardPositionRepository';
import { SnakeDirection } from '../types.ts/types';
import getLinearCongruentialGenerator from "../utils/generateRandom";
import { GetDaySecondsOfToday, GetMillisecondsOfToday } from '../utils/getDaytime';
import GameRepository from '../coreIrepositories/gameRepository';
import { DefaultGameID, DefaultPlayerIDonBoard } from '../types.ts/gameConfigs';
import GameEntity from '../entities/gameEntity';
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';


@injectable()
export default class SnakePlayerService implements ISnakePlayerService {

    private boardPositionRepository: BoardPositionRepository;
    private snakePlayerRepository: ISnakePlayerRepository;
    private gameRepository: GameRepository
    constructor(@inject(SnakePlayerRepositoryID) snakePlayerRepository: ISnakePlayerRepository, @inject(BoardPositionReposioryID) boardPositionRepository: BoardPositionRepository,
      @inject(GameRepositoryID) gameRepository: GameRepository  ){
        this.snakePlayerRepository = snakePlayerRepository
        this.boardPositionRepository = boardPositionRepository
        this.gameRepository = gameRepository

    }

    async CreateSnakePlayer(id: number, name: string, snakeDirection: string): Promise<SnakePlayerEntity> {
        const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID)
        const boardSize = gameInstance.getBoardSize()
        const halfBoardSize = Math.round(boardSize/2)
        const todayDate = new Date()
        let randomXposition = getLinearCongruentialGenerator(GetMillisecondsOfToday(todayDate),halfBoardSize, boardSize)
        let randomYposition = getLinearCongruentialGenerator(GetDaySecondsOfToday(todayDate),halfBoardSize, boardSize)
        let boardPoint: GameBoardPositionEntity
        do {
            randomXposition = getLinearCongruentialGenerator(GetMillisecondsOfToday(todayDate), halfBoardSize, boardSize)
            randomYposition = getLinearCongruentialGenerator(GetDaySecondsOfToday(todayDate), halfBoardSize, boardSize)
            console.log(randomXposition, randomYposition)
            boardPoint = await this.boardPositionRepository.GetPointOnBoard(randomXposition, randomYposition)
        } while (boardPoint.getPlayerId() != DefaultPlayerIDonBoard);
        const newSnakePlayer: SnakePlayerEntity = SnakePlayerFactory.CreateSnakePlayer(id, name, snakeDirection as SnakeDirection)
        await this.boardPositionRepository.UpdatePointOnBoard(boardPoint)
        await this.snakePlayerRepository.InsertSnakePlayer(newSnakePlayer)
        return newSnakePlayer
    }

    async UpdateSnakePlayerDirecction(id: number, snakeDirection: string): Promise<SnakePlayerEntity> {
        let snakePlayer: SnakePlayerEntity = await this.snakePlayerRepository.GetSnakePlayer(id)
        snakePlayer.setSnakeDirection(snakeDirection as SnakeDirection)
        snakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(snakePlayer)
        return snakePlayer        
    }

    async UpdateSnakePlayerName(id: number, name: string): Promise<SnakePlayerEntity> {
        let snakePlayer: SnakePlayerEntity = await this.snakePlayerRepository.GetSnakePlayer(id)
        snakePlayer.setName(name)
        snakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(snakePlayer)
        return snakePlayer
    }
}
