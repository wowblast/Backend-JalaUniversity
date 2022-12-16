import { inject, injectable } from "inversify";
import { ISnakePlayerService } from "../coreInterfaces/ISnakePlayerService";
import SnakePlayerEntity from "../entities/snakePlayerEntity";
import { ISnakePlayerRepository } from "../coreIrepositories/snakePlayeRepository";
import {
  SnakePlayerRepositoryID,
  BoardPositionReposioryID,
  GameRepositoryID,
  BoardPositionServiceID,
} from "../types.ts/inversifyTypes";
import SnakePlayerFactory from "../factories/SnakePlayerFactory";
import {
  SnakeDirection,
  BoardPositionTypesList,
  BoardPositionType,
} from "../types.ts/types";
import getLinearCongruentialGenerator from "../utils/generateRandom";
import { ConvertDateToArray } from "../utils/convertDateToArray";
import GameRepository from "../coreIrepositories/gameRepository";
import { DefaultGameID, DefaultPlayerIDonBoard } from "../types.ts/gameConfigs";
import GameEntity from "../entities/gameEntity";
import GameBoardPositionEntity from "../entities/gameBoardPositionEntity";
import BoardPositionService from "./boardPositionService";
import { SnakeDirectionsList } from '../types.ts/types';

@injectable()
export default class SnakePlayerService implements ISnakePlayerService {
  private boardPositionService: BoardPositionService;
  private snakePlayerRepository: ISnakePlayerRepository;
  private gameRepository: GameRepository;
  constructor(
    @inject(SnakePlayerRepositoryID)
    snakePlayerRepository: ISnakePlayerRepository,
    @inject(BoardPositionServiceID) boardPositionService: BoardPositionService,
    @inject(GameRepositoryID) gameRepository: GameRepository
  ) {
    this.snakePlayerRepository = snakePlayerRepository;
    this.boardPositionService = boardPositionService;
    this.gameRepository = gameRepository;
  }

  async CreateSnakePlayer(id: number, name: string, snakeDirection: string
  ): Promise<SnakePlayerEntity> {
    console.log("service");

    const gameInstance: GameEntity = await this.gameRepository.GetGameInstance(
      DefaultGameID
    );
    const boardSize = gameInstance.getBoardSize();
    console.log("id " + id, " " + name, " " + snakeDirection);
    let randomXposition: number;
    let randomYposition: number;
    let boardPoint: GameBoardPositionEntity;
    let seedDate = new Date();
    console.log(ConvertDateToArray(seedDate));

    do {
      randomXposition = getLinearCongruentialGenerator(
        seedDate.getMilliseconds() * seedDate.getMinutes(),
        seedDate.getHours(),
        boardSize
      );
      randomYposition = getLinearCongruentialGenerator(
        Math.round(seedDate.getSeconds()/seedDate.getMonth()),
        seedDate.getDay(),
        boardSize
      );
      console.log(randomXposition, randomYposition);
      boardPoint = await this.boardPositionService.GetBoardPositionByPosition(
        randomXposition,
        randomYposition
      );
      seedDate = new Date();
      console.log("while", boardPoint);
    } while (boardPoint.getPlayerId() != DefaultPlayerIDonBoard);
    boardPoint.setPlayerId(id);
    boardPoint.setBoardPositionType(
      BoardPositionTypesList.Head as BoardPositionType
    );

    const newSnakePlayer: SnakePlayerEntity =
      SnakePlayerFactory.CreateSnakePlayer(
        id,
        name,
        snakeDirection as SnakeDirection
      );
    await this.boardPositionService.UpdateBoardPosition(boardPoint);
    await this.snakePlayerRepository.InsertSnakePlayer(newSnakePlayer);
    return newSnakePlayer;
  }

  async UpdateSnakePlayerDirecction(id: number,snakeDirection: string): Promise<SnakePlayerEntity> {
    let snakePlayer: SnakePlayerEntity =
      await this.snakePlayerRepository.GetSnakePlayer(id);
    snakePlayer.setSnakeDirection(snakeDirection as SnakeDirection);
    snakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(
      snakePlayer
    );
    return snakePlayer;
  }

  async UpdateSnakePlayerName(id: number, name: string): Promise<SnakePlayerEntity> {
    let snakePlayer: SnakePlayerEntity =
      await this.snakePlayerRepository.GetSnakePlayer(id);
    snakePlayer.setName(name);
    snakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(
      snakePlayer
    );
    return snakePlayer;
  }

  async MoveSnakeForward(id: number): Promise<void> {
      const snakePlayer: SnakePlayerEntity = await this.snakePlayerRepository.GetSnakePlayer(id)
      const snake :GameBoardPositionEntity[] = await this.boardPositionService.GetBoardPositionByPlayedId(id)
      //const gameInstance: GameEntity = await this.gameRepository.ge
      snake.map(async (snakePiece)=> {
        switch (snakePlayer.getSnakeDirection()) {
            case SnakeDirectionsList.UP:
                console.log(snakePiece)
                snakePiece.setYPosition((snakePiece.getYPosition() + 1)%5 )                
                break;
            case SnakeDirectionsList.DOWN:
                snakePiece.setYPosition((snakePiece.getYPosition() + -1)%5 )                
                break;
            case SnakeDirectionsList.LEFT:
                snakePiece.setXPosition((snakePiece.getXPosition() + 1)%5 )                
                break;
            case SnakeDirectionsList.RIGHT:
                snakePiece.setXPosition((snakePiece.getXPosition() + 1)%5 )                
                break;            
        }
        console.log(snakePiece)

        await this.boardPositionService.UpdateBoardPosition(snakePiece)        
      })
  }
}
