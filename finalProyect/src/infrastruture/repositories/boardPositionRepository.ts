import { injectable } from 'inversify';
import { IBoardPositionRepository } from '../../applicationCore/coreIrepositories/boardPositionRepository';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import { AppDataSource } from '../data-source';
import BoardPosition from '../entities/gameBoardPosition';
import GameBoardPositionMapper from '../mappers/gameBoardPositionMapper';
@injectable()
export default class BoardPositionRepository implements IBoardPositionRepository {
    async CreateBoard(size: number): Promise<void> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)
        const boardPosition = new BoardPosition()
        boardPosition.IdPlayer  = -1;
        boardPosition.positionType = 'empty'

        for(let x = 0; x< size; x++) {
            for(let y = 0; y< size; y++) {
                boardPosition.xPosition = x
                boardPosition.yPosition = y
                await repository.save(boardPosition);
            }
        }
        console.log("filled")
        await AppDataSource.destroy()        
    } 
    
    async GetAllPositions(): Promise<GameBoardPositionEntity[]> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)
        const points =await repository.find()
        await AppDataSource.destroy()     
        const gameBoardPosition:GameBoardPositionEntity[]  = points.map(GameBoardPositionMapper.castToDomainEntitiy)


        return gameBoardPosition
    }
    async ClearBoard(): Promise<GameBoardPositionEntity[]> {
        //await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
        return
    }    
}