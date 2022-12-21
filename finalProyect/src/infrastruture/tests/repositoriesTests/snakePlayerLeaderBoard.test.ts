import SnakePlayerLeaderBoard from '../../entities/snakePlayerLeaderBoard'
import { TestHelper } from '../testhelper'
import SnakePlayerEntity from '../../../applicationCore/entities/snakePlayerEntity'
import { Repository } from 'typeorm'
import SnakePlayerLeaderBoardRepositoryImplementation from '../../repositories/snakePlayerLeaderBoardRepositoryImplementation'
import SnakePlayerLeaderBoardEntity from '../../../applicationCore/entities/snakePlayerLeaderboardEntity'

const snakePlayerLeaderBoardRepositoryImplementation: SnakePlayerLeaderBoardRepositoryImplementation = new SnakePlayerLeaderBoardRepositoryImplementation()
let repository: Repository<SnakePlayerLeaderBoard>
beforeAll(async () => {
  await TestHelper.instance.setupTestDB()
  snakePlayerLeaderBoardRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayerLeaderBoard))
  repository = TestHelper.instance.getDatasource().getRepository(SnakePlayerLeaderBoard)
})

afterEach(async () => {
  const entities = TestHelper.instance.getDatasource().entityMetadatas

  for (const entity of entities) {
    const repository = TestHelper.instance.getDatasource().getRepository(entity.name)
    await repository.clear()
  }
})

afterAll(async () => {
  await TestHelper.instance.teardownTestDB()
})

describe('snake Player LeaderBoard Repository', () => {
  test('should insert a snake player on leaderBoard', async () => {
    const snakePlayer = new SnakePlayerEntity(2, 'test name', 'UP', 15, 16)
    await snakePlayerLeaderBoardRepositoryImplementation.InsertSnakePlayerOnLeaderBoard(snakePlayer)
    const results = await repository.find({ ...snakePlayer })
    expect(results.length).toBe(1)
  })

  test('should delete a snake player from leaderBoard', async () => {
    const snakePlayerBestScoreDomainEntity = new SnakePlayerLeaderBoardEntity(1, 2, 'best', 15)
    const snakePlayerBestScore = new SnakePlayerLeaderBoard()
    snakePlayerBestScore.id = 1
    snakePlayerBestScore.name = 'best'
    snakePlayerBestScore.playerId = 2
    snakePlayerBestScore.score = 15
    await repository.save(snakePlayerBestScore)
    await snakePlayerLeaderBoardRepositoryImplementation.RemoveSnakePlayerFromLeaderBoard(snakePlayerBestScoreDomainEntity)
    const results = await repository.find()
    expect(results.length).toBe(0)
  })

  test('should get snake players from leaderBoard', async () => {
    const snakePlayerBestScore = new SnakePlayerLeaderBoard()
    snakePlayerBestScore.id = 1
    snakePlayerBestScore.name = 'best 1'
    snakePlayerBestScore.playerId = 1
    snakePlayerBestScore.score = 15
    await repository.save(snakePlayerBestScore)
    snakePlayerBestScore.id = 2
    snakePlayerBestScore.name = 'best 2'
    snakePlayerBestScore.playerId = 2
    snakePlayerBestScore.score = 10
    await repository.save(snakePlayerBestScore)

    await snakePlayerLeaderBoardRepositoryImplementation.GetSnakePlayerLeaderBoard()
    const results = await repository.find()
    expect(results.length).toBe(2)
  })
})
