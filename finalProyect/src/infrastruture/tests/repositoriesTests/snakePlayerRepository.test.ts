import SnakePlayer from '../../entities/snakePlayer';
import { TestHelper } from '../testhelper';
import SnakePlayerRepositoryImplementation from '../../repositories/snakePlayerRepositoryImplementation';
import SnakePlayerEntity from '../../../applicationCore/entities/snakePlayerEntity';
import { Repository } from 'typeorm';

const snakePlayerRepositoryImplementation: SnakePlayerRepositoryImplementation = new SnakePlayerRepositoryImplementation();
let repo: Repository<SnakePlayer>;
beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  snakePlayerRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getMongoRepository(SnakePlayer));
  repo = TestHelper.instance.getDatasource().getMongoRepository(SnakePlayer);
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

describe('snake player repository', () => {
  test('should insert a snake player', async () => {
    const snakePlayer = new SnakePlayerEntity(2, 'test name', 'UP', 0, 1);
    await snakePlayerRepositoryImplementation.InsertSnakePlayer(snakePlayer);
    const results = await repo.find({});
    expect(results.length).toBe(1);
  });

  test('should get a snake player by id', async () => {
    const snakePlayer = new SnakePlayer();
    snakePlayer.name = 'name test';
    snakePlayer.score = 0;
    snakePlayer.snakeDirection = 'UP';
    snakePlayer.snakeSize = 1;
    snakePlayer.playerId = 2;
    await repo.save(snakePlayer);
    const results = await snakePlayerRepositoryImplementation.GetSnakePlayer(2);
    expect(results.getPLayerId()).toBe(snakePlayer.playerId);
  });

  test('should update a snake player', async () => {
    const updatedName = 'updated name';
    const snakePlayerEntity = new SnakePlayerEntity(2, 'test name', 'UP', 0, 1);
    const snakePlayer = new SnakePlayer();
    snakePlayer.name = 'name test';
    snakePlayer.score = 0;
    snakePlayer.snakeDirection = 'UP';
    snakePlayer.snakeSize = 1;
    snakePlayer.playerId = 2;
    snakePlayerEntity.setName(updatedName);
    await repo.save(snakePlayer);
    await snakePlayerRepositoryImplementation.UpdateSnakePlayer(snakePlayerEntity);
    const results = await repo.find({});
    expect(results.length).toBe(1);
    expect(results[0].name).toBe(updatedName);
  });

  test('should delete a snake player by id', async () => {
    const snakePlayer = new SnakePlayer();
    snakePlayer.name = 'name test';
    snakePlayer.score = 0;
    snakePlayer.snakeDirection = 'UP';
    snakePlayer.snakeSize = 1;
    snakePlayer.playerId = 2;
    await repo.save(snakePlayer);
    await snakePlayerRepositoryImplementation.DeleteSnakePlayer(2);
    const results = await repo.findBy({ playerId: 2 });
    expect(results.length).toBe(0);
  });
});
