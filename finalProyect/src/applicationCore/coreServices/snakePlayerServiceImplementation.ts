import { inject, injectable } from 'inversify';
import { SnakePlayerService } from '../coreInterfaces/SnakePlayerService';
import SnakePlayerEntity from '../entities/snakePlayerEntity';
import { SnakePlayerRepository } from '../coreIrepositories/snakePlayeRepository';
import {
  SnakePlayerRepositoryID,
  GameRepositoryID,
  BoardPositionServiceID
  , SnakeFoodServiceIdentifier, SnakePlayerLeaderBoardServiceIdentifier
} from '../types.ts/inversifyTypes';
import SnakePlayerFactory from '../factories/SnakePlayerFactory';
import {
  SnakeDirection,
  BoardPositionTypesList,
  BoardPositionType,
  SnakeDirectionsList,
  GameStatusStates
  , OpositeSnakeDirectionsList
} from '../types.ts/types';
import getLinearCongruentialGenerator from '../utils/generateRandom';
import GameRepository from '../coreIrepositories/gameRepository';
import { DefaultGameID, DefaultPlayerIDonBoard, DefaultFoodID, PointsPerFood, DefaultSnakeBodyIdentifier, DefaultNextPointBoardDirection } from '../types.ts/gameConfigs';
import GameEntity from '../entities/gameEntity';
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import BoardPositionService from './boardPositionServiceImplementation';

import { SnakeFoodService } from '../coreInterfaces/SnakeFoodService';

import { SnakePlayerLeaderBoardService } from '../coreInterfaces/SnakePlayerLeaderboard';

@injectable()
export default class SnakePlayerServiceImplementation implements SnakePlayerService {
  private readonly boardPositionService: BoardPositionService;
  private readonly snakePlayerRepository: SnakePlayerRepository;
  private readonly gameRepository: GameRepository;
  private readonly snakeFoodService: SnakeFoodService;
  private readonly snakePlayerLeaderBoardService: SnakePlayerLeaderBoardService;
  constructor (
  @inject(SnakePlayerRepositoryID)
    snakePlayerRepository: SnakePlayerRepository,
    @inject(BoardPositionServiceID) boardPositionService: BoardPositionService,
    @inject(GameRepositoryID) gameRepository: GameRepository,
    @inject(SnakeFoodServiceIdentifier) snakeFoodService: SnakeFoodService,
    @inject(SnakePlayerLeaderBoardServiceIdentifier)snakePlayerLeaderBoardService: SnakePlayerLeaderBoardService
  ) {
    this.snakePlayerRepository = snakePlayerRepository;
    this.boardPositionService = boardPositionService;
    this.gameRepository = gameRepository;
    this.snakeFoodService = snakeFoodService;
    this.snakePlayerLeaderBoardService = snakePlayerLeaderBoardService;
  }

  async CreateSnakePlayer (id: number, name: string, snakeDirection: string
  ): Promise<SnakePlayerEntity> {
    const newSnakePlayer: SnakePlayerEntity = this.createSnakePlayerEntity(id, name, snakeDirection as SnakeDirection);
    const snakePlayerOnBoard = await this.getSnakePlayerOnBoard(newSnakePlayer);
    await this.insertSnakePlayer(newSnakePlayer);
    await this.inserSnakePlayerOnBoard(snakePlayerOnBoard);
    return newSnakePlayer;
  }

  async UpdateSnakePlayerDirecction (id: number, snakeDirection: string): Promise<SnakePlayerEntity> {
    const gameInstace: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID);
    const snakePlayer: SnakePlayerEntity =
      await this.snakePlayerRepository.GetSnakePlayer(id);
    if (gameInstace.getStatus() === GameStatusStates.ReadyState) {
      snakePlayer.setSnakeDirection(snakeDirection as SnakeDirection);
      const updatedSnakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(snakePlayer);
      return updatedSnakePlayer;
    }
    return snakePlayer;
  }

  async UpdateSnakePlayerName (id: number, name: string): Promise<SnakePlayerEntity> {
    const snakePlayer: SnakePlayerEntity =
      await this.snakePlayerRepository.GetSnakePlayer(id);
    snakePlayer.setName(name);
    const updatedSnakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(
      snakePlayer
    );
    return updatedSnakePlayer;
  }

  async MoveSnakeForward (id: number, snakeDirection: string): Promise<boolean> {
    await this.UpdateSnakePlayerDirecction(id, snakeDirection);
    await this.snakePlayerRepository.GetSnakePlayer(id);
    const nextPosition = await this.getNextPosition(await this.getSnakeHead(id), snakeDirection as SnakeDirection);
    const isSnakeMoved = await this.moveifNextPositionIsAvailable(nextPosition, id);
    await this.removeSnakeMoveIfnotMoved(isSnakeMoved, id);
    await this.PrintBoardOnConsole();
    return isSnakeMoved;
  }

  async getBoardSize (): Promise<number> {
    const gameInstance: GameEntity = await this.getGameInstance();
    return gameInstance.getBoardSize();
  }

  async getGameInstance (): Promise<GameEntity> {
    return await this.gameRepository.GetGameInstance(DefaultGameID);
  }

  getRandomCoordinatesPoints (maxnumber: number): [number, number] {
    const seedDate = new Date();
    const xPosition = getLinearCongruentialGenerator(
      seedDate.getMilliseconds() * seedDate.getMinutes() * seedDate.getUTCDate() * seedDate.getTime(),
      seedDate.getHours(),
      maxnumber
    );
    const yPosition = getLinearCongruentialGenerator(
      Math.round(seedDate.getTime() * seedDate.getDay() * seedDate.getSeconds() / seedDate.getMonth()),
      seedDate.getDay(),
      maxnumber
    );
    return [xPosition, yPosition];
  }

  async getBoardPosition (xPosition: number, yPosition: number): Promise<GameBoardPositionEntity> {
    return await this.boardPositionService.GetBoardPositionByPosition(
      xPosition,
      yPosition
    );
  }

  async getEmptyBoardPosition (): Promise<GameBoardPositionEntity> {
    let randomXposition: number;
    let randomYposition: number;
    let boardPoint: GameBoardPositionEntity;
    do {
      [randomXposition, randomYposition] = this.getRandomCoordinatesPoints(await this.getBoardSize());
      boardPoint = await this.getBoardPosition(randomXposition, randomYposition);
    } while (boardPoint.getPlayerId() !== DefaultPlayerIDonBoard);
    return boardPoint;
  }

  async getSnakePlayerOnBoard (snakePlayer: SnakePlayerEntity): Promise<GameBoardPositionEntity> {
    const boardPoint = await this.getEmptyBoardPosition();
    boardPoint.setPlayerId(snakePlayer.getPLayerId());
    boardPoint.setBoardPositionType(
      BoardPositionTypesList.Head as BoardPositionType
    );
    boardPoint.setSnakeBodyIdentifier(snakePlayer.getPLayerId());
    boardPoint.setSnakeDirection(snakePlayer.getSnakeDirection());
    return boardPoint;
  }

  createSnakePlayerEntity (id: number, name: string, snakeDirection: SnakeDirection): SnakePlayerEntity {
    return SnakePlayerFactory.CreateSnakePlayer(id, name, snakeDirection);
  }

  async insertSnakePlayer (newSnakePlayer: SnakePlayerEntity): Promise<void> {
    await this.snakePlayerRepository.InsertSnakePlayer(newSnakePlayer);
  }

  async inserSnakePlayerOnBoard (boardPoint: GameBoardPositionEntity): Promise<void> {
    await this.boardPositionService.UpdateBoardPosition(boardPoint);
  }

  setNewPositions (oldPosition: GameBoardPositionEntity, newPosition: GameBoardPositionEntity): [GameBoardPositionEntity, GameBoardPositionEntity] {
    newPosition.setPlayerId(oldPosition.getPlayerId());
    newPosition.setBoardPositionType(oldPosition.getBoardPositionType());
    newPosition.setSnakeBodyIdentifier(oldPosition.getSnakeBodyIdentifier());
    newPosition.setSnakeDirection(oldPosition.getSnakeDirection());
    oldPosition.setBoardPositionType(BoardPositionTypesList.Empty as BoardPositionType);
    oldPosition.setPlayerId(DefaultPlayerIDonBoard);
    oldPosition.setSnakeBodyIdentifier(DefaultSnakeBodyIdentifier);
    oldPosition.setSnakeDirection(DefaultNextPointBoardDirection);

    return [oldPosition, newPosition];
  }

  async saveNewSnakeBodyPositions (oldPosition: GameBoardPositionEntity, newPosition: GameBoardPositionEntity): Promise<void> {
    await this.boardPositionService.UpdateBoardPosition(oldPosition);
    await this.boardPositionService.UpdateBoardPosition(newPosition);
  }

  async moveSnakeBody (snakeBody: GameBoardPositionEntity[]): Promise<void> {
    let oldPosition: GameBoardPositionEntity;
    let newPosition: GameBoardPositionEntity;
    for (let index = 0; index < snakeBody.length; index++) {
      [oldPosition, newPosition] = this.setNewPositions(snakeBody[index], await this.getNextPosition(snakeBody[index], snakeBody[index].getSnakeDirection()));
      await this.saveNewSnakeBodyPositions(oldPosition, newPosition);
    }
  }

  async moveifNextPositionIsAvailable (nextPoint: GameBoardPositionEntity, id: number): Promise<boolean> {
    const snakePlayer: SnakePlayerEntity = await this.snakePlayerRepository.GetSnakePlayer(id);
    const sortedSnakeBody = await this.getSorteSnakeBodyOnBoard(id);
    const snakeDirection = snakePlayer.getSnakeDirection();
    let isSnakeMoved = false;
    const newSnakeBody: GameBoardPositionEntity[] = await this.getSorteSnakeBodyOnBoard(id);
    const updatedSnakeDirection: GameBoardPositionEntity[] = this.updateSnakeDireccionOnSnake(sortedSnakeBody, snakeDirection);

    switch (nextPoint.getBoardPositionType()) {
      case BoardPositionTypesList.Empty:
        await this.moveSnakeBody(updatedSnakeDirection);
        isSnakeMoved = true;
        break;
      case BoardPositionTypesList.Food:
        await this.consumeSnakeFood(nextPoint);
        await this.inserBodyOfSnakePlayer(newSnakeBody[newSnakeBody.length - 1],
          await this.getNextPosition(newSnakeBody[newSnakeBody.length - 1],
            OpositeSnakeDirectionsList[newSnakeBody[newSnakeBody.length - 1].getSnakeDirection()]));
        await this.increaseSizeofSnakePlayer(snakePlayer);
        await this.increaseScoreofSnakePlayer(snakePlayer);
        await this.InsertSnakeFoodOnBoard();
        await this.MoveSnakeForward(id, snakeDirection);
        isSnakeMoved = true;
        break;
    }
    return isSnakeMoved;
  }

  async getSorteSnakeBodyOnBoard (id: number): Promise<GameBoardPositionEntity[]> {
    const snakeBody: GameBoardPositionEntity[] = await this.boardPositionService.GetBoardPositionByPlayedId(id);
    return this.sortSnakebodyPointsByBodyIndentifier(snakeBody);
  }

  async getNextPosition (oldPosition: GameBoardPositionEntity, skaneDirection: SnakeDirection): Promise<GameBoardPositionEntity> {
    const boardSize = await this.getBoardSize();
    switch (skaneDirection) {
      case SnakeDirectionsList.UP:
        return await this.boardPositionService.GetBoardPositionByPosition(oldPosition.getXPosition(),
          (boardSize + oldPosition.getYPosition() + 1) % boardSize);
      case SnakeDirectionsList.DOWN:
        return await this.boardPositionService.GetBoardPositionByPosition(oldPosition.getXPosition(),
          (boardSize + oldPosition.getYPosition() - 1) % boardSize);
      case SnakeDirectionsList.LEFT:
        return await this.boardPositionService.GetBoardPositionByPosition((boardSize + oldPosition.getXPosition() -
              1) % boardSize, oldPosition.getYPosition());
      case SnakeDirectionsList.RIGHT:
        return await this.boardPositionService.GetBoardPositionByPosition((boardSize + oldPosition.getXPosition() +
              1) % boardSize, oldPosition.getYPosition());
    }
    return await this.boardPositionService.GetBoardPositionByPosition((boardSize + oldPosition.getXPosition() +
    1) % boardSize, oldPosition.getYPosition());
  }

  async getSnakeHead (id: number): Promise<GameBoardPositionEntity> {
    return await this.boardPositionService.GetBoardPointByPlayerIDAndPositionType(id, BoardPositionTypesList.Head as BoardPositionType);
  }

  async removeSnakeMoveIfnotMoved (isSnakeMoved: boolean, id: number): Promise<void> {
    if (!isSnakeMoved) {
      await this.insertScoreIfTop(id);
      await this.removeSnakePlayer(id);
    }
  }

  async removeSnakeFromBoard (id: number): Promise<void> {
    const snakeBody: GameBoardPositionEntity[] = await this.boardPositionService.GetBoardPositionByPlayedId(id);
    for (let index = 0; index < snakeBody.length; index++) {
      snakeBody[index].setBoardPositionType('empty');
      snakeBody[index].setPlayerId(DefaultPlayerIDonBoard);
      snakeBody[index].setSnakeBodyIdentifier(DefaultSnakeBodyIdentifier);
      snakeBody[index].setSnakeDirection(SnakeDirectionsList.DEFAULT as SnakeDirection);
      await this.boardPositionService.UpdateBoardPosition(snakeBody[index]);
    }
  }

  async insertScoreIfTop (id: number): Promise<void> {
    const snakePlayer: SnakePlayerEntity = await this.snakePlayerRepository.GetSnakePlayer(id);
    await this.snakePlayerLeaderBoardService.InsertSnakePlayerOnLeaderBoardIfTopScore(snakePlayer);
  }

  async removeSnakePlayer (id: number): Promise<void> {
    await this.removeSnakeFromBoard(id);
    await this.removeSnakePlayerEntity(id);
  }

  async removeSnakePlayerEntity (id: number): Promise<void> {
    await this.snakePlayerRepository.DeleteSnakePlayer(id);
  }

  async InsertSnakeFoodOnBoard (): Promise<void> {
    const emptyBoardPoint: GameBoardPositionEntity = await this.getEmptyBoardPosition();
    emptyBoardPoint.setPlayerId(DefaultFoodID);
    emptyBoardPoint.setBoardPositionType(BoardPositionTypesList.Food as BoardPositionType);
    await this.boardPositionService.UpdateBoardPosition(emptyBoardPoint);
  }

  async consumeSnakeFood (foodOnBoard: GameBoardPositionEntity): Promise<void> {
    await this.snakeFoodService.RemoveFoodPointOnBoard(foodOnBoard.getPositionId());
  }

  async increaseSizeofSnakePlayer (snakePlayer: SnakePlayerEntity): Promise<void> {
    snakePlayer.setSnakeSize(snakePlayer.getSnakeSize() + PointsPerFood);
    await this.snakePlayerRepository.UpdateSnakePlayer(snakePlayer);
  }

  async increaseScoreofSnakePlayer (snakePlayer: SnakePlayerEntity): Promise<void> {
    snakePlayer.setScore(snakePlayer.getScore() + PointsPerFood);
    await this.snakePlayerRepository.UpdateSnakePlayer(snakePlayer);
  }

  async inserBodyOfSnakePlayer (lastSnakePiece: GameBoardPositionEntity, newPosition: GameBoardPositionEntity): Promise<void> {
    newPosition.setPlayerId(lastSnakePiece.getPlayerId());
    newPosition.setBoardPositionType(BoardPositionTypesList.Boody as BoardPositionType);
    newPosition.setSnakeBodyIdentifier(lastSnakePiece.getSnakeBodyIdentifier() + 1);
    newPosition.setSnakeDirection(lastSnakePiece.getSnakeDirection());
    await this.boardPositionService.UpdateBoardPosition(newPosition);
  }

  sortSnakebodyPointsByBodyIndentifier (snakeBody: GameBoardPositionEntity[]): GameBoardPositionEntity[] {
    return snakeBody.sort((a, b) => a.getSnakeBodyIdentifier() < b.getSnakeBodyIdentifier() ? -1 : a.getSnakeBodyIdentifier() < b.getSnakeBodyIdentifier() ? 1 : 0);
  }

  updateSnakeDireccionOnSnake (snakeBody: GameBoardPositionEntity[], snakeDirection: SnakeDirection): GameBoardPositionEntity[] {
    let oldDirection: SnakeDirection;
    let lastSnakePointDirection: SnakeDirection;
    return snakeBody.map((snakePoint, index) => {
      oldDirection = snakePoint.getSnakeDirection();
      index !== 0 ? snakePoint.setSnakeDirection(lastSnakePointDirection) : snakePoint.setSnakeDirection(snakeDirection);
      lastSnakePointDirection = oldDirection;

      return snakePoint;
    });
  }

  async PrintBoardOnConsole (): Promise<void> {
    const gameInstace: GameEntity = await this.gameRepository.GetGameInstance(DefaultGameID);
    const allPositions = await this.boardPositionService.GetAllPositions();
    let pos = allPositions[0];
    console.log('');
    for (let x = (gameInstace.getBoardSize() - 1); x >= 0; x--) {
      for (let y = 0; y < gameInstace.getBoardSize(); y++) {
        pos = allPositions.filter((poss) => poss.getXPosition() === y && poss.getYPosition() === x)[0];
        process.stdout.write('[' + pos.getPlayerId().toString() + '] ');
      }
      console.log('');
    }
  }
}
