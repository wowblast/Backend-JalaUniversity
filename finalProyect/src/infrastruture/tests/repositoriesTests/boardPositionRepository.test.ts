import BoardPosition from '../../entities/gameBoardPosition'
import { TestHelper } from '../testhelper'
import GameBoardPositionEntity from '../../../applicationCore/entities/gameBoardPositionEntity'
import BoardPositionRepositoryImplementation from '../../repositories/boardPositionRepository'

const boardPositionRepository: BoardPositionRepositoryImplementation = new BoardPositionRepositoryImplementation()
beforeAll(async () => {
  await TestHelper.instance.setupTestDB()
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getRepository(BoardPosition))
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

describe('boardPosition Repository', () => {
  test('should insert a Point', async () => {
    const position = new GameBoardPositionEntity(1, 1, 0, 'empty', 0, 0, '-')
    await boardPositionRepository.InsertPointOnBoard(position)
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()
    expect(results.length).toBe(1)
  })

  test('should delete all Points', async () => {
    const position = new GameBoardPositionEntity(1, 1, 0, 'empty', 0, 0, '-')
    await boardPositionRepository.InsertPointOnBoard(position)
    await boardPositionRepository.ClearBoard()
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()
    expect(results.length).toBe(0)
  })

  test('should retrieve a point by ID and PositionTye', async () => {
    const position = new GameBoardPositionEntity(1, 1, 0, 'empty', 0, 0, '-')
    await boardPositionRepository.InsertPointOnBoard(position)
    const savedPosition = await boardPositionRepository.GetBoardPointByPlayerIDAndPositionType(1, 'empty')
    expect(savedPosition).toStrictEqual(position)
  })

  test('should retrieve a point by ID and PositionTye', async () => {
    const playerId = 2
    const position1 = new GameBoardPositionEntity(playerId, 1, 2, 'head', 0, 0, 'UP')
    const position2 = new GameBoardPositionEntity(playerId, 2, 3, 'body', 0, 0, 'UP')
    await boardPositionRepository.InsertPointOnBoard(position1)
    await boardPositionRepository.InsertPointOnBoard(position2)
    const savedPositions = await boardPositionRepository.GetBoardPointsByPlayerID(2)
    expect(savedPositions).toStrictEqual([position1, position2])
  })

  test('should retrieve a point by x and y positions', async () => {
    const xPosition = 0
    const yPosiiton = 0
    const position = new GameBoardPositionEntity(1, 1, 0, 'empty', xPosition, yPosiiton, '-')
    await boardPositionRepository.InsertPointOnBoard(position)
    const savedPosition = await boardPositionRepository.GetPointOnBoard(xPosition, yPosiiton)
    expect(savedPosition).toStrictEqual(position)
  })

  test('should clear an point by positionID', async () => {
    const position = new GameBoardPositionEntity(5, 5, 0, 'head', 0, 0, 'UP')
    await boardPositionRepository.InsertPointOnBoard(position)
    await boardPositionRepository.ClearPointOnBoard(5)
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()
    expect(results[0].getBoardPositionType()).toBe('empty')
  })

  test('should update an point', async () => {
    const position = new GameBoardPositionEntity(5, 5, 0, 'head', 0, 0, 'UP')
    await boardPositionRepository.InsertPointOnBoard(position)
    position.setSnakeDirection('DOWN')
    await boardPositionRepository.UpdatePointOnBoard(position)
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()
    expect(results[0].getSnakeDirection()).toBe('DOWN')
  })

  test('should create a board given a size', async () => {
    const boardSize = 2
    await boardPositionRepository.CreateBoard(boardSize)
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()
    expect(results.length).toBe(4)
  })
})
