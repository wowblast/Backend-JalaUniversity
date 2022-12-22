import BoardPosition from '../../../infrastruture/entities/gameBoardPosition';
import { TestHelper } from '../testhelper';
import BoardPositionServiceImplementation from '../../coreServices/boardPositionServiceImplementation';
import BoardPositionRepositoryImplementation from '../../../infrastruture/repositories/boardPositionRepository';
import GameRepositoryImplementation from '../../../infrastruture/repositories/gameRepositoryImplementation';
import SnakePlayerLeaderBoardRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerLeaderBoardRepositoryImplementation';
import SnakePlayerRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerRepositoryImplementation';
import Game from '../../../infrastruture/entities/game';
import SnakePlayerLeaderBoard from '../../../infrastruture/entities/snakePlayerLeaderBoard';
import SnakePlayer from '../../../infrastruture/entities/snakePlayer';
import SnakeFoodServiceImplementation from '../../coreServices/snakeFoodServiceImplementation';
import GameBoardPositionEntity from '../../entities/gameBoardPositionEntity';

const boardPositionRepository: BoardPositionRepositoryImplementation = new BoardPositionRepositoryImplementation();
const gameRepositoryImplementation: GameRepositoryImplementation = new GameRepositoryImplementation();
const snakePlayerLeaderBoardRepositoryImplementation: SnakePlayerLeaderBoardRepositoryImplementation = new SnakePlayerLeaderBoardRepositoryImplementation();
const snakePlayerRepositoryImplementation: SnakePlayerRepositoryImplementation = new SnakePlayerRepositoryImplementation();
let boardPositionServiceImplementation: BoardPositionServiceImplementation;
let snakeFoodServiceImplementation: SnakeFoodServiceImplementation;

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getRepository(BoardPosition));
  gameRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(Game));
  snakePlayerLeaderBoardRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayerLeaderBoard));
  snakePlayerRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayer));
  boardPositionServiceImplementation = new BoardPositionServiceImplementation(boardPositionRepository);
  snakeFoodServiceImplementation = new SnakeFoodServiceImplementation(boardPositionServiceImplementation);
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

describe('snake Food Service Implementation', () => {
  const boardPosition = new BoardPosition();
  const playerID = 3;

  boardPosition.id = 1;
  boardPosition.playerId = playerID;
  boardPosition.positionType = 'head';
  boardPosition.snakeBodyIndentifier = playerID;
  boardPosition.snakeDirection = 'UP';
  boardPosition.xPosition = 0;
  boardPosition.yPosition = 0;

  test('should insert food point updating a point on board', async () => {
    await boardPositionServiceImplementation.CreateBoard(3);
    const foodPoint = new GameBoardPositionEntity(2, 1, 0, 'food', 0, 0, '-');
    await snakeFoodServiceImplementation.InsertFoodPointOnBoard(foodPoint);
    const foodPosition = await boardPositionServiceImplementation.GetBoardPositionByPosition(0, 0);
    expect(foodPosition.getBoardPositionType()).toBe('food');
  });

  test('should delete food point updating a point on board', async () => {
    await boardPositionServiceImplementation.CreateBoard(3);
    const foodPoint = new GameBoardPositionEntity(2, 1, 0, 'food', 0, 0, '-');
    await snakeFoodServiceImplementation.InsertFoodPointOnBoard(foodPoint);
    await snakeFoodServiceImplementation.RemoveFoodPointOnBoard(1);
    const foodPosition = await boardPositionServiceImplementation.GetBoardPositionByPosition(0, 0);

    expect(foodPosition.getBoardPositionType()).toBe('empty');
  });
});
