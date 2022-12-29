import { injectable } from 'inversify';
import { DefaultNextPointBoardDirection, DefaultPlayerIDonBoard, DefaultSnakeBodyIdentifier } from '../../applicationCore/types.ts/gameConfigs';
import { BoardPositionRepository } from '../../applicationCore/coreIrepositories/boardPositionRepository';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import { AppDataSource } from '../data-source';
import BoardPosition from '../entities/gameBoardPosition';
import GameBoardPositionMapper from '../mappers/gameBoardPositionMapper';
import { BoardPositionType, BoardPositionTypesList } from '../../applicationCore/types.ts/types';
import { MongoRepository } from 'typeorm';
import GameBoardPosition from '../entities/gameBoardPosition';
@injectable()
export default class BoardPositionRepositoryImplementation implements BoardPositionRepository {
  private repository: MongoRepository<BoardPosition>;
  constructor () {
    this.repository = AppDataSource.getMongoRepository(BoardPosition);
  }

  setRepo (repository): void {
    this.repository = repository;
  }

  async CreateBoard (size: number): Promise<GameBoardPositionEntity[]> {
    await this.ClearBoard();

    let index = 1;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const boardPosition = new BoardPosition();
        boardPosition.id = index;
      boardPosition.playerId = DefaultPlayerIDonBoard;
    boardPosition.positionType = BoardPositionTypesList.Empty;
        boardPosition.xPosition = x;
        boardPosition.yPosition = y;
        boardPosition.snakeBodyIndentifier = DefaultSnakeBodyIdentifier;
        boardPosition.snakeDirection = DefaultNextPointBoardDirection;
        await this.repository.save(boardPosition);
        index++;
      }
    }
    return await this.GetAllPositions();
  }

  async GetAllPositions (): Promise<GameBoardPositionEntity[]> {
    //
    const points = await this.repository.find();
    const gameBoardPosition: GameBoardPositionEntity[] = points.map(GameBoardPositionMapper.castToDomainEntitiy);

    return gameBoardPosition;
  }

  async GetAllSnakeHeads (): Promise<GameBoardPositionEntity[]> {
    //
    const points = await this.repository.findBy({ positionType: 'head' });
    const gameBoardPosition: GameBoardPositionEntity[] = points.map(GameBoardPositionMapper.castToDomainEntitiy);
    return gameBoardPosition;
  }

  async ClearBoard (): Promise<void> {
    await this.repository.delete({});
  }

  async InsertPointOnBoard (gameBoardPositionEntity: GameBoardPositionEntity): Promise<void> {
    const boardPosition: BoardPosition = GameBoardPositionMapper.castToDBEntity(gameBoardPositionEntity);
    await this.repository.save(boardPosition);
  }

  async ClearPointOnBoard (positionId: number): Promise<void> {
    const deletedPoint: BoardPosition = await this.repository.findOneByOrFail({
      id: positionId
    });
    deletedPoint.playerId = DefaultPlayerIDonBoard;
    deletedPoint.positionType = BoardPositionTypesList.Empty;
    await this.repository.save(deletedPoint);
  }

  async UpdatePointOnBoard (gameBoardPositionEntity: GameBoardPositionEntity): Promise<GameBoardPositionEntity> {
    const boardPosition: BoardPosition = GameBoardPositionMapper.castToDBEntity(gameBoardPositionEntity);
    const position: GameBoardPosition = await this.repository.findOneByOrFail({id: boardPosition.id});
    const updatePoint = {...boardPosition, _id: position._id};
    await this.repository.save(updatePoint);
    return gameBoardPositionEntity;
  }

  async GetPointOnBoard (xPosition: number, yPosition: number): Promise<GameBoardPositionEntity> {
    const pointOnBoard: BoardPosition = await this.repository.findOneOrFail({
      where: { xPosition, yPosition }
    });
    const domainPointEntity = GameBoardPositionMapper.castToDomainEntitiy(pointOnBoard);
    return domainPointEntity;
  }

  async GetBoardPointsByPlayerID (playerId: number): Promise<GameBoardPositionEntity[]> {
    const points = await this.repository.findBy({ playerId });
    const gameBoardPosition: GameBoardPositionEntity[] = points.map(GameBoardPositionMapper.castToDomainEntitiy);
    return gameBoardPosition;
  }

  async GetBoardPointByPlayerIDAndPositionType (playerId: number, boardPositionType: BoardPositionType): Promise<GameBoardPositionEntity> {
    const point = await this.repository.findOneByOrFail({ playerId, positionType: boardPositionType });
    return GameBoardPositionMapper.castToDomainEntitiy(point);
  }
}
