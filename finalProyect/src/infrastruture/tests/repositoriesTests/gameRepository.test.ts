import { TestHelper } from '../testhelper';
import { Repository } from 'typeorm';
import Game from '../../entities/game';
import GameRepositoryImplementation from '../../repositories/gameRepositoryImplementation';
import GameEntity from '../../../applicationCore/entities/gameEntity';

const gameRepositoryImplementation: GameRepositoryImplementation = new GameRepositoryImplementation();
let repository: Repository<Game>;
beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  gameRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getMongoRepository(Game));
  repository = TestHelper.instance.getDatasource().getMongoRepository(Game);
});

beforeEach(async () => {
  const entities = TestHelper.instance.getDatasource().entityMetadatas;

  for (const entity of entities) {
    const repository = TestHelper.instance.getDatasource().getMongoRepository(entity.name);
    await repository.delete({});
  }
});

afterAll(async () => {
  await TestHelper.instance.teardownTestDB();
});

describe('game repository', () => {
  test('should insert a new game', async () => {
    const gameInstance = new GameEntity(1, 'Ready', 5, 3);
    await gameRepositoryImplementation.InsertGameInstance(gameInstance);
    const results = await repository.findBy({ id: gameInstance.getId() });
    expect(results.length).toBe(1);
  });

  test('should get a game instance ', async () => {
    const gameInstance = new Game();
    gameInstance.boardSize = 5;
    gameInstance.id = 1;
    gameInstance.status = 'Ready';
    gameInstance.stepIntervalBySeconds = 1;
    await repository.save(gameInstance);
    // console.log(await repository.find())
    const results = await gameRepositoryImplementation.GetGameInstance(1);
    expect(results.getId()).toBe(1);
  });

  test('should Update a game instance ', async () => {
    const gameInstance = new Game();
    gameInstance.boardSize = 5;
    gameInstance.id = 1;
    gameInstance.status = 'Ready';
    gameInstance.stepIntervalBySeconds = 3;
    const gameInstanceEntity = new GameEntity(1, 'Ended', 5, 3);
    await repository.save(gameInstance);
    gameInstanceEntity.setStatus('Ended');
    await gameRepositoryImplementation.UpdateGameInstance(gameInstanceEntity);
    const results = await repository.find({});
    expect(results.length).toBe(1);
    expect(results[0].status).toBe(gameInstanceEntity.getStatus());
  });

  test('should delete a game instance ', async () => {
    const gameInstance = new Game();
    gameInstance.boardSize = 5;
    gameInstance.id = 1;
    gameInstance.status = 'Ready';
    gameInstance.stepIntervalBySeconds = 1;
    await repository.save(gameInstance);
    await gameRepositoryImplementation.DeleteGameInstance(gameInstance.id);
    const results = await repository.find({});
    expect(results.length).toBe(0);
  });
});
