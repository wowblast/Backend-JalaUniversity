import BoardPosition from '../../../infrastruture/entities/gameBoardPosition';
import { TestHelper } from '../testhelper';
import BoardPositionServiceImplementation from '../../coreServices/boardPositionServiceImplementation';
import BoardPositionRepositoryImplementation from '../../../infrastruture/repositories/boardPositionRepository';
import GameRepositoryImplementation from '../../../infrastruture/repositories/gameRepositoryImplementation';
import SnakePlayerLeaderBoardRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerLeaderBoardRepositoryImplementation';
import SnakePlayerRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerRepositoryImplementation';
import GameServiceImplementation from '../../coreServices/gameServiceImplementation';
import SnakePlayerServiceImplementation from '../../coreServices/snakePlayerServiceImplementation';
import Game from '../../../infrastruture/entities/game';
import SnakePlayerLeaderBoard from '../../../infrastruture/entities/snakePlayerLeaderBoard';
import SnakePlayer from '../../../infrastruture/entities/snakePlayer';
import SnakeFoodServiceImplementation from '../../coreServices/snakeFoodServiceImplementation';
import SnakePlayerLeaderBoardServiceImplementation from '../../coreServices/snakePlayerLeaderBoardServiceImplementation';

import GameBoardPositionEntity from '../../entities/gameBoardPositionEntity';
import SnakePlayerEntity from '../../entities/snakePlayerEntity';

const boardPositionRepository: BoardPositionRepositoryImplementation = new BoardPositionRepositoryImplementation();
const gameRepositoryImplementation: GameRepositoryImplementation = new GameRepositoryImplementation();
const snakePlayerLeaderBoardRepositoryImplementation: SnakePlayerLeaderBoardRepositoryImplementation = new SnakePlayerLeaderBoardRepositoryImplementation();
const snakePlayerRepositoryImplementation: SnakePlayerRepositoryImplementation = new SnakePlayerRepositoryImplementation();
let boardPositionServiceImplementation: BoardPositionServiceImplementation;
let gameServiceImplementation: GameServiceImplementation;
let snakePlayerServiceImplementation: SnakePlayerServiceImplementation;
let snakeFoodServiceImplementation: SnakeFoodServiceImplementation;
let snakePlayerLeaderBoardServiceImplementation: SnakePlayerLeaderBoardServiceImplementation;

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getRepository(BoardPosition));
  gameRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(Game));
  snakePlayerLeaderBoardRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayerLeaderBoard));
  snakePlayerRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayer));
  boardPositionServiceImplementation = new BoardPositionServiceImplementation(boardPositionRepository);
  snakeFoodServiceImplementation = new SnakeFoodServiceImplementation(boardPositionServiceImplementation);
  snakePlayerServiceImplementation = new SnakePlayerServiceImplementation(snakePlayerRepositoryImplementation, boardPositionServiceImplementation,
    gameRepositoryImplementation, snakeFoodServiceImplementation, snakePlayerLeaderBoardServiceImplementation);
  gameServiceImplementation = new GameServiceImplementation(boardPositionServiceImplementation, gameRepositoryImplementation, snakePlayerServiceImplementation);
});

afterEach(async () => {
  const entities = TestHelper.instance.getDatasource().entityMetadatas;

  for (const entity of entities) {
    const repository = TestHelper.instance.getDatasource().getRepository(entity.name);
    await repository.clear();
  }
});

afterAll(async () => {
  await TestHelper.instance.teardownTestDB();
});

describe('Snake player service Implementation', () => {
  const boardPosition = new BoardPosition();
  const playerID = 3;

  boardPosition.id = 1;
  boardPosition.playerId = playerID;
  boardPosition.positionType = 'head';
  boardPosition.snakeBodyIndentifier = playerID;
  boardPosition.snakeDirection = 'UP';
  boardPosition.xPosition = 0;
  boardPosition.yPosition = 0;

  test('should insert a snakePlayer and get snake head', async () => {
    await gameServiceImplementation.CreateGame(5, 5);
    await snakePlayerServiceImplementation.CreateSnakePlayer(2, 'test', 'UP');
    const snakeHead: GameBoardPositionEntity = await snakePlayerServiceImplementation.getSnakeHead(2);
    expect(snakeHead.getPlayerId()).toBe(2);
  });

  test('should move snake player', async () => {
    await gameServiceImplementation.CreateGame(3, 5);
    await snakePlayerServiceImplementation.CreateSnakePlayer(2, 'test', 'UP');
    const boardBeforeMovement: GameBoardPositionEntity = await snakePlayerServiceImplementation.getSnakeHead(2);
    await snakePlayerServiceImplementation.getSnakeHead(2);
    await snakePlayerServiceImplementation.MoveSnakeForward(2, 'UP');
    const afterMovement: GameBoardPositionEntity = await snakePlayerServiceImplementation.getSnakeHead(2);

    expect(boardBeforeMovement).not.toEqual(afterMovement);
  });

  test('should move snake player', async () => {
    await gameServiceImplementation.CreateGame(3, 5);
    await snakePlayerServiceImplementation.CreateSnakePlayer(2, 'test', 'UP');
    const snakePlayer: SnakePlayerEntity = await snakePlayerServiceImplementation.UpdateSnakePlayerDirecction(2, 'DOWN');
    expect(snakePlayer.getSnakeDirection()).toEqual('DOWN');
  });

  test('should update  snake player name ', async () => {
    await gameServiceImplementation.CreateGame(3, 5);
    await snakePlayerServiceImplementation.CreateSnakePlayer(2, 'test', 'UP');
    const snakePlayer: SnakePlayerEntity = await snakePlayerServiceImplementation.UpdateSnakePlayerName(2, 'new name');
    expect(snakePlayer.getName()).toEqual('new name');
  });

  test('should not update  snake player direction if status games is not ready ', async () => {
    await gameServiceImplementation.CreateGame(3, 5);
    await gameServiceImplementation.updateGamestatus('Playing');
    await snakePlayerServiceImplementation.CreateSnakePlayer(2, 'test', 'UP');
    const snakePlayer: SnakePlayerEntity = await snakePlayerServiceImplementation.UpdateSnakePlayerDirecction(2, 'DOWN');
    expect(snakePlayer.getSnakeDirection()).toEqual('UP');
  });

  test('should get next position given a position and direction ', async () => {
    await gameServiceImplementation.CreateGame(3, 5);
    await snakePlayerServiceImplementation.CreateSnakePlayer(2, 'test', 'UP');
    const point: GameBoardPositionEntity = await boardPositionServiceImplementation.GetBoardPositionByPosition(0,0);
    const nextLeftPosition = await snakePlayerServiceImplementation.getNextPosition(point,'LEFT');
    const nextRightPosition = await snakePlayerServiceImplementation.getNextPosition(point,'RIGHT');
    const nextUpPosition = await snakePlayerServiceImplementation.getNextPosition(point,'UP');
    const nextDownPosition = await snakePlayerServiceImplementation.getNextPosition(point,'DOWN');

    expect([nextLeftPosition.getXPosition(), nextLeftPosition.getYPosition()]).toEqual([2,0]);
    expect([nextRightPosition.getXPosition(), nextRightPosition.getYPosition()]).toEqual([1,0]);
    expect([nextUpPosition.getXPosition(), nextUpPosition.getYPosition()]).toEqual([0,1]);
    expect([nextDownPosition.getXPosition(), nextDownPosition.getYPosition()]).toEqual([0,2]);

  });
});
