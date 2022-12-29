/*import BoardPosition from '../../../infrastruture/entities/gameBoardPosition';
import { TestHelper } from '../testhelper';
import BoardPositionRepositoryImplementation from '../../../infrastruture/repositories/boardPositionRepository';
import GameRepositoryImplementation from '../../../infrastruture/repositories/gameRepositoryImplementation';
import SnakePlayerLeaderBoardRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerLeaderBoardRepositoryImplementation';
import SnakePlayerRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerRepositoryImplementation';
import { Repository } from 'typeorm';
import Game from '../../../infrastruture/entities/game';
import SnakePlayerLeaderBoard from '../../../infrastruture/entities/snakePlayerLeaderBoard';
import SnakePlayer from '../../../infrastruture/entities/snakePlayer';
import SnakePlayerLeaderBoardServiceImplementation from '../../coreServices/snakePlayerLeaderBoardServiceImplementation';
import SnakePlayerEntity from '../../../applicationCore/entities/snakePlayerEntity';

const boardPositionRepository: BoardPositionRepositoryImplementation = new BoardPositionRepositoryImplementation();
const gameRepositoryImplementation: GameRepositoryImplementation = new GameRepositoryImplementation();
const snakePlayerLeaderBoardRepositoryImplementation: SnakePlayerLeaderBoardRepositoryImplementation = new SnakePlayerLeaderBoardRepositoryImplementation();
const snakePlayerRepositoryImplementation: SnakePlayerRepositoryImplementation = new SnakePlayerRepositoryImplementation();
let snakePlayerLeaderBoardServiceImplementation: SnakePlayerLeaderBoardServiceImplementation;
let repository: Repository<SnakePlayerLeaderBoard>;

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  repository = TestHelper.instance.getDatasource().getMongoRepository(SnakePlayerLeaderBoard);
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getMongoRepository(BoardPosition));
  gameRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getMongoRepository(Game));
  snakePlayerLeaderBoardRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getMongoRepository(SnakePlayerLeaderBoard));
  snakePlayerRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getMongoRepository(SnakePlayer));

  snakePlayerLeaderBoardServiceImplementation = new SnakePlayerLeaderBoardServiceImplementation(snakePlayerLeaderBoardRepositoryImplementation);
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

describe('snake player leaderboard service', () => {
  const boardPosition = new BoardPosition();
  const playerID = 3;

  boardPosition.id = 1;
  boardPosition.playerId = playerID;
  boardPosition.positionType = 'head';
  boardPosition.snakeBodyIndentifier = playerID;
  boardPosition.snakeDirection = 'UP';
  boardPosition.xPosition = 0;
  boardPosition.yPosition = 0;

  test('should insert a score is score is empty', async () => {
    const topPlayer = new SnakePlayerEntity(2, 'TOP G', 'LEFT', 5, 1);
    await snakePlayerLeaderBoardServiceImplementation.InsertSnakePlayerOnLeaderBoardIfTopScore(topPlayer);
    const results = await repository.find();
    expect(results.length).toBe(1);
    expect(results[0].playerId).toBe(2);
  });

  test('should get the top scores', async () => {
    const topPlayer = new SnakePlayerEntity(2, 'TOP G', 'LEFT', 5, 1);
    await snakePlayerLeaderBoardServiceImplementation.InsertSnakePlayerOnLeaderBoardIfTopScore(topPlayer);

    const results = await snakePlayerLeaderBoardServiceImplementation.GetSnakePlayerLeaderBoard();
    expect(results.length).toBe(1);
    expect(results[0].getPlayerId()).toBe(2);
  });

  test('should not insert if 3 the top scores', async () => {
    const topPlayer1 = new SnakePlayerEntity(2, 'TOP G', 'LEFT', 8, 1);
    const topPlayer2 = new SnakePlayerEntity(3, 'TOP G', 'LEFT', 7, 1);
    const topPlayer3 = new SnakePlayerEntity(4, 'TOP G', 'LEFT', 6, 1);
    const newTopPlayer = new SnakePlayerEntity(5, 'TOP G', 'LEFT', 3, 1);

    await snakePlayerLeaderBoardServiceImplementation.InsertSnakePlayerOnLeaderBoardIfTopScore(topPlayer1);
    await snakePlayerLeaderBoardServiceImplementation.InsertSnakePlayerOnLeaderBoardIfTopScore(topPlayer2);
    await snakePlayerLeaderBoardServiceImplementation.InsertSnakePlayerOnLeaderBoardIfTopScore(topPlayer3);
    await snakePlayerLeaderBoardServiceImplementation.InsertSnakePlayerOnLeaderBoardIfTopScore(newTopPlayer);

    const results = await snakePlayerLeaderBoardServiceImplementation.GetSnakePlayerLeaderBoard();
    expect(results.length).toBe(3);
  });
});
*/