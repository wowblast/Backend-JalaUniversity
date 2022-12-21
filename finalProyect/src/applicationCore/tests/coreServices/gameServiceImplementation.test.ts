import BoardPosition from '../../../infrastruture/entities/gameBoardPosition';
import { TestHelper } from "../testhelper";
import GameBoardPositionEntity from '../../../applicationCore/entities/gameBoardPositionEntity';
import BoardPositionServiceImplementation from '../../coreServices/boardPositionServiceImplementation';
import BoardPositionRepositoryImplementation from '../../../infrastruture/repositories/boardPositionRepository';
import GameRepositoryImplementation from '../../../infrastruture/repositories/gameRepositoryImplementation';
import SnakePlayerLeaderBoardRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerLeaderBoardRepositoryImplementation';
import SnakePlayerRepositoryImplementation from '../../../infrastruture/repositories/snakePlayerRepositoryImplementation';
import { Repository } from 'typeorm';
import GameServiceImplementation from '../../coreServices/gameServiceImplementation';
import SnakePlayerServiceImplementation from '../../coreServices/snakePlayerServiceImplementation';
import GameBoardPosition from '../../../infrastruture/entities/gameBoardPosition';
import Game from '../../../infrastruture/entities/game';
import SnakePlayerLeaderBoard from '../../../infrastruture/entities/snakePlayerLeaderBoard';
import SnakePlayer from '../../../infrastruture/entities/snakePlayer';
import SnakeFoodServiceImplementation from '../../coreServices/snakeFoodServiceImplementation';
import SnakePlayerLeaderBoardServiceImplementation from '../../coreServices/snakePlayerLeaderBoardServiceImplementation';
import { DefaultGameID } from '../../types.ts/gameConfigs';
import GameEntity from '../../entities/gameEntity';
import { GameStatusStates } from '../../../applicationCore/types.ts/types';

const  boardPositionRepository: BoardPositionRepositoryImplementation = new BoardPositionRepositoryImplementation()
const  gameRepositoryImplementation: GameRepositoryImplementation = new GameRepositoryImplementation()
const  snakePlayerLeaderBoardRepositoryImplementation: SnakePlayerLeaderBoardRepositoryImplementation = new SnakePlayerLeaderBoardRepositoryImplementation()
const  snakePlayerRepositoryImplementation: SnakePlayerRepositoryImplementation = new SnakePlayerRepositoryImplementation()
let boardPositionServiceImplementation: BoardPositionServiceImplementation
let  gameServiceImplementation: GameServiceImplementation
let snakePlayerServiceImplementation: SnakePlayerServiceImplementation
let snakeFoodServiceImplementation: SnakeFoodServiceImplementation
let snakePlayerLeaderBoardServiceImplementation: SnakePlayerLeaderBoardServiceImplementation
let repository:Repository<Game>
let boardRepository: Repository<BoardPosition>

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  repository = TestHelper.instance.getDatasource().getRepository(Game)
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getRepository(BoardPosition))
  gameRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(Game))
  snakePlayerLeaderBoardRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayerLeaderBoard))
  snakePlayerRepositoryImplementation.setRepository(TestHelper.instance.getDatasource().getRepository(SnakePlayer))
  boardPositionServiceImplementation = new BoardPositionServiceImplementation(boardPositionRepository)
  snakeFoodServiceImplementation = new SnakeFoodServiceImplementation(boardPositionServiceImplementation)
  snakePlayerServiceImplementation = new SnakePlayerServiceImplementation(snakePlayerRepositoryImplementation,boardPositionServiceImplementation,
    gameRepositoryImplementation, snakeFoodServiceImplementation,snakePlayerLeaderBoardServiceImplementation)
  gameServiceImplementation = new  GameServiceImplementation(boardPositionServiceImplementation, gameRepositoryImplementation, snakePlayerServiceImplementation)

});

afterEach(async ()=> {
  const entities =  TestHelper.instance.getDatasource().entityMetadatas;

  for (const entity of entities) {
      const repository = TestHelper.instance.getDatasource().getRepository(entity.name);
      await repository.clear(); 
  }
})


afterAll(async () => {  
  TestHelper.instance.teardownTestDB();
});

describe("Game Service Implementation", () => {
  const boardPosition = new BoardPosition()
  const playerID = 3

  boardPosition.id = 1
  boardPosition.playerId = playerID
  boardPosition.positionType = 'head'
  boardPosition.snakeBodyIndentifier = playerID
  boardPosition.snakeDirection = 'UP'
  boardPosition.xPosition =0
  boardPosition.yPosition =0

  test("should create a game", async () => {
    const boardSize = 3  
    await gameServiceImplementation.CreateGame(boardSize, 5)
    const results= await repository.find()
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(1)
   
  });

  test("should get game instance", async () => {
    const boardSize = 3  
    await gameServiceImplementation.CreateGame(boardSize, 5)
    const gameInstance: GameEntity= await gameServiceImplementation.GetGameStatus()
    expect(gameInstance.getId()).toBe(DefaultGameID)
    expect(gameInstance.getStatus()).toBe(GameStatusStates.ReadyState)   
  });

  test("should update game status to playing state", async () => {
    const boardSize = 3  
    await gameServiceImplementation.CreateGame(boardSize, 5)
    await gameServiceImplementation.updateGamestatus('Playing')
    const gameInstance: GameEntity= await gameServiceImplementation.GetGameStatus()
    expect(gameInstance.getId()).toBe(DefaultGameID)
    expect(gameInstance.getStatus()).toBe(GameStatusStates.Playing)   
  });

  test('delay 5 seconds function', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    gameServiceImplementation.delay(5)
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test("should end  game and delete game instance", async () => {
    const boardSize = 3  
    await gameServiceImplementation.CreateGame(boardSize, 5)
    await gameServiceImplementation.EndGame()
    const results= await repository.find()

    expect(results.length).toBe(0)
  });

  test("should restart the game and create new board", async () => {
    const boardSize = 3
    await gameServiceImplementation.CreateGame(boardSize, 5)
    await gameServiceImplementation.updateGamestatus('Ended')
    await gameServiceImplementation.RestartGame()
    const gameInstance = await gameServiceImplementation.GetGameStatus()
    expect(gameInstance.getStatus()).toBe('Ready')
   
  });


})