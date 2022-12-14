import BoardPosition from '../../../infrastruture/entities/gameBoardPosition';
import { TestHelper } from '../testhelper';
import GameBoardPositionEntity from '../../../applicationCore/entities/gameBoardPositionEntity';
import BoardPositionServiceImplementation from '../../coreServices/boardPositionServiceImplementation';
import BoardPositionRepositoryImplementation from '../../../infrastruture/repositories/boardPositionRepository';
import { Repository } from 'typeorm';

const boardPositionRepository: BoardPositionRepositoryImplementation = new BoardPositionRepositoryImplementation();

let boardPositionServiceImplementation: BoardPositionServiceImplementation;
let repository: Repository<BoardPosition>;
beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  repository = TestHelper.instance.getDatasource().getMongoRepository(BoardPosition);
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getMongoRepository(BoardPosition));
  boardPositionServiceImplementation = new BoardPositionServiceImplementation(boardPositionRepository);
});

afterEach(async () => {
  const entities = TestHelper.instance.getDatasource().entityMetadatas;

  for (const entity of entities) {
    const repository = TestHelper.instance.getDatasource().getMongoRepository(entity.name);
    await repository.delete({});
  }
});

afterAll(async () => {
  await TestHelper.instance.teardownTestDB();
});

describe('board Position Service Implementation', () => {
  const boardPosition = new BoardPosition();
  const playerID = 3;

  boardPosition.id = 1;
  boardPosition.playerId = playerID;
  boardPosition.positionType = 'head';
  boardPosition.snakeBodyIndentifier = playerID;
  boardPosition.snakeDirection = 'UP';
  boardPosition.xPosition = 0;
  boardPosition.yPosition = 0;

  test('should insert a board', async () => {
    const boardSize = 3;
    await boardPositionServiceImplementation.CreateBoard(boardSize);
    const results = await repository.find();
    expect(results.length).toBe(boardSize * boardSize);
  });

  test('should clear all points on board', async () => {
    const boardSize = 3;
    await boardPositionServiceImplementation.CreateBoard(boardSize);
    await boardPositionServiceImplementation.ClearBoard();
    const results = await repository.find();
    expect(results.length).toBe(0);
  });

  test('should clear all points on board and set it as empty', async () => {
    await repository.save(boardPosition);

    await boardPositionServiceImplementation.ClearBoardPositionByPositionId(1);
    const results = await repository.find();

    expect(results.length).toBe(1);
    expect(results[0].positionType).toBe('empty');
  });

  test('should get all positions', async () => {
    await repository.save(boardPosition);

    const results: GameBoardPositionEntity[] = await boardPositionServiceImplementation.GetAllPositions();

    expect(results.length).toBe(1);
    expect(results[0].getBoardPositionType()).toBe('head');
  });

  test('should get skane heads positions', async () => {
    await boardPositionServiceImplementation.CreateBoard(4);
    await repository.save(boardPosition);

    const results: GameBoardPositionEntity[] = await boardPositionServiceImplementation.GetAllSnakeHeads();

    expect(results.length).toBe(1);
    expect(results[0].getBoardPositionType()).toBe('head');
  });

  test('should get a point by position type and id', async () => {
    await boardPositionServiceImplementation.CreateBoard(4);
    await repository.save(boardPosition);

    const results: GameBoardPositionEntity = await boardPositionServiceImplementation.GetBoardPointByPlayerIDAndPositionType(playerID, 'head');

    expect(results.getBoardPositionType()).toBe('head');
  });

  test('should get a point by position type and id', async () => {
    await boardPositionServiceImplementation.CreateBoard(4);
    await repository.save(boardPosition);

    const results: GameBoardPositionEntity = await boardPositionServiceImplementation.GetBoardPointByPlayerIDAndPositionType(playerID, 'head');

    expect(results.getBoardPositionType()).toBe('head');
  });

  test('should get a point by player id', async () => {
    await boardPositionServiceImplementation.CreateBoard(4);
    await repository.save(boardPosition);

    const results: GameBoardPositionEntity[] = await boardPositionServiceImplementation.GetBoardPositionByPlayedId(3);

    expect(results.length).toBe(1);
    expect(results[0].getBoardPositionType()).toBe('head');
  });

  test('should get a point by x and y positions', async () => {
    await boardPositionServiceImplementation.CreateBoard(4);
    const entityHead: GameBoardPositionEntity = new GameBoardPositionEntity(1,1,1,'head',0,0,'UP');
    await boardPositionRepository.UpdatePointOnBoard(entityHead);

    const results: GameBoardPositionEntity = await boardPositionServiceImplementation.GetBoardPositionByPosition(0, 0);

    expect(results.getBoardPositionType()).toBe('head');
  });

  test('should update a point', async () => {
    await boardPositionServiceImplementation.CreateBoard(4);
    const newPosition = new GameBoardPositionEntity(9, 1, 9, 'head', 0, 0, 'UP');
    await boardPositionServiceImplementation.UpdateBoardPosition(newPosition);
    const results: GameBoardPositionEntity[] = await boardPositionServiceImplementation.GetAllSnakeHeads();

    expect(results[0].getBoardPositionType()).toBe('head');
  });
});
