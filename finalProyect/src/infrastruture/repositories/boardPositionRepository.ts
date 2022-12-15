import { injectable } from 'inversify';
import { IBoardPositionRepository } from '../../applicationCore/coreIrepositories/boardPositionRepository';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import { AppDataSource } from '../data-source';
import BoardPosition from '../entities/gameBoardPosition';
import GameBoardPositionMapper from '../mappers/gameBoardPositionMapper';
@injectable()
export default class BoardPositionRepository implements IBoardPositionRepository {
    async CreateBoard(size: number): Promise<GameBoardPositionEntity[]> {
        await this.ClearBoard()

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
        await AppDataSource.destroy()  
        return this.GetAllPositions()
    } 
    
    async GetAllPositions(): Promise<GameBoardPositionEntity[]> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)
        const points =await repository.find()
        const gameBoardPosition:GameBoardPositionEntity[]  = points.map(GameBoardPositionMapper.castToDomainEntitiy)
        return gameBoardPosition
    }
    async ClearBoard(): Promise<void> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)
        await repository.clear()
        await AppDataSource.destroy()
    }    

    async InsertPointOnBoard(gameBoardPositionEntity: GameBoardPositionEntity): Promise<void> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)
        const boardPosition: BoardPosition = GameBoardPositionMapper.castToDBEntity(gameBoardPositionEntity)
        await repository.save(boardPosition)
        await AppDataSource.destroy()
    }
}