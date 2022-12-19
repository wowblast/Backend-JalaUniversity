import { inject, injectable } from "inversify";
import { ISnakePlayerService } from "../coreInterfaces/ISnakePlayerService";
import SnakePlayerEntity from "../entities/snakePlayerEntity";
import { ISnakePlayerRepository } from "../coreIrepositories/snakePlayeRepository";
import {
  SnakePlayerRepositoryID,
  GameRepositoryID,
  BoardPositionServiceID,
} from "../types.ts/inversifyTypes";
import SnakePlayerFactory from "../factories/SnakePlayerFactory";
import {
  SnakeDirection,
  BoardPositionTypesList,
  BoardPositionType,
  SnakeDirectionsList
} from "../types.ts/types";
import getLinearCongruentialGenerator from "../utils/generateRandom";
import GameRepository from "../coreIrepositories/gameRepository";
import { DefaultGameID, DefaultPlayerIDonBoard, DefaultFoodID, PointsPerFood, DefaultSnakeBodyIdentifier, DefaultNextPointBoardDirection } from '../types.ts/gameConfigs';
import GameEntity from "../entities/gameEntity";
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import BoardPositionService from "./boardPositionService";
import { SnakeFoodServiceIdentifier } from '../types.ts/inversifyTypes';
import { SnakeFoodService } from '../coreInterfaces/SnakeFoodService';
import { OpositeSnakeDirectionsList } from '../types.ts/types';

@injectable()
export default class SnakePlayerService implements ISnakePlayerService {
  private boardPositionService: BoardPositionService;
  private snakePlayerRepository: ISnakePlayerRepository;
  private gameRepository: GameRepository;
  private snakeFoodService : SnakeFoodService
  constructor(
    @inject(SnakePlayerRepositoryID)
    snakePlayerRepository: ISnakePlayerRepository,
    @inject(BoardPositionServiceID) boardPositionService: BoardPositionService,
    @inject(GameRepositoryID) gameRepository: GameRepository,
    @inject(SnakeFoodServiceIdentifier ) snakeFoodService: SnakeFoodService
  ) {
    this.snakePlayerRepository = snakePlayerRepository;
    this.boardPositionService = boardPositionService;
    this.gameRepository = gameRepository;
    this.snakeFoodService = snakeFoodService
  }

  async CreateSnakePlayer(id: number, name: string, snakeDirection: string
  ): Promise<SnakePlayerEntity> {

    const newSnakePlayer: SnakePlayerEntity = this.createSnakePlayerEntity(id, name, snakeDirection as SnakeDirection)
    const snakePlayerOnBoard = await this.getSnakePlayerOnBoard(newSnakePlayer)
    await this.insertSnakePlayer(newSnakePlayer)
    await this.inserSnakePlayerOnBoard(snakePlayerOnBoard)
    return newSnakePlayer    
  }

  async UpdateSnakePlayerDirecction(id: number,snakeDirection: string): Promise<SnakePlayerEntity> {
    const snakePlayer: SnakePlayerEntity =
      await this.snakePlayerRepository.GetSnakePlayer(id);
    snakePlayer.setSnakeDirection(snakeDirection as SnakeDirection);
    const updatedSnakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(
      snakePlayer
    );
    return updatedSnakePlayer;
  }

  async UpdateSnakePlayerName(id: number, name: string): Promise<SnakePlayerEntity> {
    const snakePlayer: SnakePlayerEntity =
      await this.snakePlayerRepository.GetSnakePlayer(id);
    snakePlayer.setName(name);
    const updatedSnakePlayer = await this.snakePlayerRepository.UpdateSnakePlayer(
      snakePlayer
    );
    return updatedSnakePlayer;
  }

  async MoveSnakeForward(id: number, snakeDirection: string): Promise<Boolean> {
    await this.UpdateSnakePlayerDirecction(id, snakeDirection)
    await this.snakePlayerRepository.GetSnakePlayer(id)
    const nextPosition = await this.getNextPosition(await this.getSnakeHead(id), snakeDirection as SnakeDirection)
    const isSnakeMoved = await this.moveifNextPositionIsAvailable(nextPosition, id)
    await this.removeSnakeMoveIfnotMoved(isSnakeMoved,id)
    await this.printBoardOnConsole()
    return isSnakeMoved

  }

  async getBoardSize(): Promise<number> {
    const gameInstance: GameEntity = await this.getGameInstance()
    return gameInstance.getBoardSize();
  }

  async getGameInstance(): Promise<GameEntity> {
    return await this.gameRepository.GetGameInstance(DefaultGameID);
  }

  getRandomCoordinatesPoints(maxnumber: number) {
    let seedDate = new Date();    
    const xPosition = getLinearCongruentialGenerator(
        seedDate.getMilliseconds() * seedDate.getMinutes(),
        seedDate.getHours(),
        maxnumber
      );
    const yPosition = getLinearCongruentialGenerator(
        Math.round(seedDate.getSeconds()/seedDate.getMonth()),
        seedDate.getDay(),
        maxnumber
      );
    return [xPosition, yPosition]
  }

  async getBoardPosition( xPosition: number, yPosition: number ): Promise<GameBoardPositionEntity>  {
    return await this.boardPositionService.GetBoardPositionByPosition(
      xPosition,
      yPosition
    );
  }

  async getEmptyBoardPosition(): Promise<GameBoardPositionEntity> {
    let randomXposition: number;
    let randomYposition: number;
    let boardPoint: GameBoardPositionEntity;
    do {
      [randomXposition, randomYposition] = this.getRandomCoordinatesPoints(await this.getBoardSize())
      boardPoint = await this.getBoardPosition(randomXposition, randomYposition)      
    } while (boardPoint.getPlayerId() != DefaultPlayerIDonBoard);
    return boardPoint
  }

  async getSnakePlayerOnBoard(snakePlayer: SnakePlayerEntity): Promise<GameBoardPositionEntity> {
    const boardPoint = await this.getEmptyBoardPosition()
    boardPoint.setPlayerId(snakePlayer.getPLayerId());
    boardPoint.setBoardPositionType(
      BoardPositionTypesList.Head as BoardPositionType
    );
    boardPoint.setSnakeBodyIdentifier(snakePlayer.getPLayerId())
    boardPoint.setSnakeDirection(snakePlayer.getSnakeDirection())
    return boardPoint
  }
  
  createSnakePlayerEntity(id: number, name: string, snakeDirection: SnakeDirection): SnakePlayerEntity{
    return SnakePlayerFactory.CreateSnakePlayer(id, name, snakeDirection);
  }

  async insertSnakePlayer(newSnakePlayer: SnakePlayerEntity): Promise<void> {
    await this.snakePlayerRepository.InsertSnakePlayer(newSnakePlayer);
  }

  async inserSnakePlayerOnBoard(boardPoint: GameBoardPositionEntity): Promise<void> {
    await this.boardPositionService.UpdateBoardPosition(boardPoint);
  }


  setNewPositions(oldPosition: GameBoardPositionEntity, newPosition: GameBoardPositionEntity): [GameBoardPositionEntity,GameBoardPositionEntity] {
    newPosition.setPlayerId(oldPosition.getPlayerId())
    newPosition.setBoardPositionType(oldPosition.getBoardPositionType())
    newPosition.setSnakeBodyIdentifier(oldPosition.getSnakeBodyIdentifier())
    newPosition.setSnakeDirection(oldPosition.getSnakeDirection())
    oldPosition.setBoardPositionType(BoardPositionTypesList.Empty as BoardPositionType)
    oldPosition.setPlayerId(DefaultPlayerIDonBoard)
    oldPosition.setSnakeBodyIdentifier(DefaultSnakeBodyIdentifier)
    oldPosition.setSnakeDirection(DefaultNextPointBoardDirection)

    return [oldPosition, newPosition]
  }

  async saveNewSnakeBodyPositions(oldPosition: GameBoardPositionEntity, newPosition: GameBoardPositionEntity): Promise<void> {
    await this.boardPositionService.UpdateBoardPosition(oldPosition)
    await this.boardPositionService.UpdateBoardPosition(newPosition)  
  }

  async moveSnakeBody(snakeBody: GameBoardPositionEntity[]): Promise<void> {
    let oldPosition: GameBoardPositionEntity = null
    let newPosition: GameBoardPositionEntity = null
    for (let index = 0; index < snakeBody.length; index++) {      
      [oldPosition, newPosition] = this.setNewPositions(snakeBody[index], await this.getNextPosition(snakeBody[index], snakeBody[index].getSnakeDirection()))
      await this.saveNewSnakeBodyPositions(oldPosition, newPosition)      
    }
  }

  async moveifNextPositionIsAvailable(nextPoint: GameBoardPositionEntity, id: number): Promise<boolean>{
    const snakePlayer: SnakePlayerEntity = await this.snakePlayerRepository.GetSnakePlayer(id)
    const sortedSnakeBody = await this.getSorteSnakeBodyOnBoard(id)
    const snakeDirection = snakePlayer.getSnakeDirection()
    let isSnakeMoved = false
    switch (nextPoint.getBoardPositionType()) {
      case BoardPositionTypesList.Empty:
          const updatedSnakeDirection:GameBoardPositionEntity[] = this.updateSnakeDireccionOnSnake(sortedSnakeBody,snakeDirection)
          await this.moveSnakeBody(updatedSnakeDirection)
          isSnakeMoved = true        
          break;
      case BoardPositionTypesList.Food:
          await this.consumeSnakeFood(nextPoint)
         
          //await this.moveSnakeBody(updatedSnakeDirection)
          const newSnakeBody = await this.getSorteSnakeBodyOnBoard(id)
          console.log("ancutalpi",newSnakeBody)

          //console.log("normla dir",newSnakeBody[newSnakeBody.length-1].getSnakeDirection())
          //console.log("test upo",OpositeSnakeDirectionsList["UP"] )
          //console.log("directruiin",OpositeSnakeDirectionsList[newSnakeBody[newSnakeBody.length-1].getSnakeDirection()] )
          //console.log("ancutalpi",newSnakeBody[newSnakeBody.length-1])
          await this.inserBodyOfSnakePlayer(newSnakeBody[newSnakeBody.length-1],
            await this.getNextPosition(newSnakeBody[newSnakeBody.length-1],OpositeSnakeDirectionsList[newSnakeBody[newSnakeBody.length-1].getSnakeDirection()]))

          await this.increaseSizeofSnakePlayer(snakePlayer)        
          await this.InsertSnakeFoodOnBoard()
          //await this.MoveSnakeForward(id, snakeDirection)
          isSnakeMoved = true
          break;
    }
    return isSnakeMoved
  }

  async getSorteSnakeBodyOnBoard(id: number): Promise<GameBoardPositionEntity[]> {
    const snakeBody :GameBoardPositionEntity[] = await this.boardPositionService.GetBoardPositionByPlayedId(id)
    return this.sortSnakebodyPointsByBodyIndentifier(snakeBody)
  }

  async getNextPosition(oldPosition: GameBoardPositionEntity,skaneDirection: SnakeDirection): Promise<GameBoardPositionEntity> {
    const boardSize = await this.getBoardSize();
    switch (skaneDirection) {
        case SnakeDirectionsList.UP:
            return await this.boardPositionService.GetBoardPositionByPosition(oldPosition.getXPosition(),
             (boardSize +oldPosition.getYPosition() + 1) % boardSize)                
        case SnakeDirectionsList.DOWN:
            return await this.boardPositionService.GetBoardPositionByPosition(oldPosition.getXPosition(),
             (boardSize +oldPosition.getYPosition() - 1) % boardSize)
        case SnakeDirectionsList.LEFT:
            return await this.boardPositionService.GetBoardPositionByPosition((boardSize +oldPosition.getXPosition()
              - 1) % boardSize, oldPosition.getYPosition()) 
        case SnakeDirectionsList.RIGHT:
            return await this.boardPositionService.GetBoardPositionByPosition((boardSize +oldPosition.getXPosition()
              + 1) % boardSize, oldPosition.getYPosition())
    }
  }

  async getSnakeHead(id: number) {
    return await this.boardPositionService.GetBoardPointByPlayerIDAndPositionType(id, BoardPositionTypesList.Head as BoardPositionType)
  }

  async removeSnakeMoveIfnotMoved(isSnakeMoved: boolean, id: number):Promise<void> {
    !isSnakeMoved && this.removeSnakePlayer(id)
  }

  async removeSnakeFromBoard(id: number) {
    const snakeBody: GameBoardPositionEntity[] = await this.boardPositionService.GetBoardPositionByPlayedId(id)  
    for (let index = 0; index < snakeBody.length; index++) {
      snakeBody[index].setBoardPositionType("empty")
      snakeBody[index].setPlayerId(DefaultPlayerIDonBoard)
      snakeBody[index].setSnakeBodyIdentifier(DefaultSnakeBodyIdentifier)
      snakeBody[index].setSnakeDirection(SnakeDirectionsList.DEFAULT as SnakeDirection)
      await this.boardPositionService.UpdateBoardPosition(snakeBody[index])    
    }  
  }

  async removeSnakePlayer(id: number):Promise<void> {
    await this.removeSnakeFromBoard(id)
    await this.removeSnakePlayerEntity(id)
  }

  async removeSnakePlayerEntity(id: number):Promise<void> {
    await this.snakePlayerRepository.DeleteSnakePlayer(id)
    
  }

  async InsertSnakeFoodOnBoard(): Promise<void> {
    const emptyBoardPoint: GameBoardPositionEntity = await this.getEmptyBoardPosition()
    emptyBoardPoint.setPlayerId(DefaultFoodID)
    emptyBoardPoint.setBoardPositionType(BoardPositionTypesList.Food as BoardPositionType)
    await this.boardPositionService.UpdateBoardPosition(emptyBoardPoint)
  }

  async consumeSnakeFood(foodOnBoard: GameBoardPositionEntity): Promise<void> {
    console.log("food",foodOnBoard)
    await this.snakeFoodService.RemoveFoodPointOnBoard(foodOnBoard.getPositionId())
  }

  async increaseSizeofSnakePlayer(snakePlayer : SnakePlayerEntity) {
    snakePlayer.setSnakeSize(snakePlayer.getSnakeSize() + PointsPerFood)
    await this.snakePlayerRepository.UpdateSnakePlayer(snakePlayer)
  }

  async inserBodyOfSnakePlayer(lastSnakePiece: GameBoardPositionEntity,newPosition: GameBoardPositionEntity) {
    newPosition.setPlayerId(lastSnakePiece.getPlayerId())
    newPosition.setBoardPositionType(lastSnakePiece.getBoardPositionType())
    newPosition.setSnakeBodyIdentifier(lastSnakePiece.getSnakeBodyIdentifier()+ 1)
    newPosition.setSnakeDirection(lastSnakePiece.getSnakeDirection())
    console.log("newbodyu", newPosition)
    await this.boardPositionService.UpdateBoardPosition(newPosition)
  }

  sortSnakebodyPointsByBodyIndentifier(snakeBody: GameBoardPositionEntity[]) {
    return snakeBody.sort((a, b) => a.getSnakeBodyIdentifier() < b.getSnakeBodyIdentifier() ? -1 : a.getSnakeBodyIdentifier() < b.getSnakeBodyIdentifier() ? 1 : 0)
  }

  updateSnakeDireccionOnSnake(snakeBody: GameBoardPositionEntity[], snakeDirection: SnakeDirection): GameBoardPositionEntity[] {
    let oldDirection : SnakeDirection
    let lastSnakePointDirection: SnakeDirection
    return snakeBody.map((snakePoint, index) => {
      oldDirection = snakePoint.getSnakeDirection()
      index != 0 ? snakePoint.setSnakeDirection(lastSnakePointDirection): snakePoint.setSnakeDirection(snakeDirection)      
      lastSnakePointDirection = oldDirection

      return snakePoint
    })
  }

  async printBoardOnConsole() {
    const allPositions = await this.boardPositionService.GetAllPositions()
        let pos = allPositions[0]
        console.log()
        for (let x = 4; 0 <= x; x--) {
            for (let y = 0; y < 5; y++) {
                pos = allPositions.filter((poss) => poss.getXPosition() == y && poss.getYPosition() == x)[0]
                process.stdout.write("[" +pos.getPlayerId()+"] ");
            }
            console.log()            
        }
  }

  

 

 
  

}
