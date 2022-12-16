import { ISnakePositionRepository } from "../../applicationCore/coreIrepositories/snakePositionRepository";
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import SnakePlayerEntity from "../../applicationCore/entities/snakePlayerEntity";
import { GetDaySecondsOfToday, GetMinutesOfToday } from "../../applicationCore/utils/getDaytime";
import getLinearCongruentialGenerator from '../../applicationCore/utils/generateRandom';
import BoardPosition from '../entities/gameBoardPosition';
import { AppDataSource } from "../data-source";
import GameBoardPositionMapper from "../mappers/gameBoardPositionMapper";
import { SnakeDirection } from "../../applicationCore/types.ts/types";
import { injectable } from 'inversify';

export default class SnakePositionRepository implements ISnakePositionRepository {
    async MoveSnakeForwards(id: number, snakeDirection: SnakeDirection): Promise<Boolean> {

        return
    }
    async GetSnakePositions(id: number): Promise<GameBoardPositionEntity[]> {
        return

    }
    async RemoveSnake(): Promise<void> {
        return

    }
    async StartAutoMovemenvent(): Promise<void> {
        return

    }
    
    async  CreateSnakeBody(id: number): Promise<GameBoardPositionEntity[]> {
        return

    }
    /*async CreateSnakePlayer(gameBoardPositionEntity: GameBoardPositionEntity): Promise<GameBoardPositionEntity> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)        
        const randomXposition = getLinearCongruentialGenerator(GetDaySecondsOfToday(),Math.round(size),size)
        const randomYposition = getLinearCongruentialGenerator(GetMinutesOfToday(),Math.round(size),size)        
        const emptyPoint:BoardPosition  = await repository.findOneByOrFail( {
            xPosition: randomXposition,
            yPosition: randomYposition 
        })
        
        emptyPoint.IdPlayer = gameBoardPositionEntity.getPositionId()
        emptyPoint.positionType = gameBoardPositionEntity.getBoardPositionType()
        emptyPoint.xPosition = randomXposition
        emptyPoint.yPosition = randomYposition
        await repository.save(emptyPoint)

        return GameBoardPositionMapper.castToDomainEntitiy(emptyPoint)
    }*/
}