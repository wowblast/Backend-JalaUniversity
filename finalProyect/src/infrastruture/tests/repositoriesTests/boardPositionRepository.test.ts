//mport { createUser } from "../src/controllers/user.controller";
//@ts-ignore
import BoardPosition from '../../entities/gameBoardPosition';
import BoardPositionRepository from '../../repositories/boardPositionRepository'
import { TestHelper } from "../testhelper";
import GameBoardPositionEntity from '../../../applicationCore/entities/gameBoardPositionEntity';

const  boardPositionRepository: BoardPositionRepository = new BoardPositionRepository()
beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
  boardPositionRepository.setRepo(TestHelper.instance.getDatasource().getRepository(BoardPosition))

});


afterAll(() => {
  TestHelper.instance.teardownTestDB();
});

describe("Insert boardPosition", () => {

  test("should insert a Point", async () => {
    let position = new GameBoardPositionEntity(1,1,0,'empty',0,0,'-')
    
    await boardPositionRepository.InsertPointOnBoard(position)
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()     
    expect(results.length).toBe(1);
   
  });

  test("should delete all Points", async () => {
    let position = new GameBoardPositionEntity(1,1,0,'empty',0,0,'-')
    
    await boardPositionRepository.InsertPointOnBoard(position)
    await boardPositionRepository.ClearBoard()
    const results: GameBoardPositionEntity[] = await boardPositionRepository.GetAllPositions()     
    expect(results.length).toBe(0);
   
  });
});

