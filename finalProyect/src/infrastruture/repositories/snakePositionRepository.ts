import { ISnakePositionRepository } from "../../applicationCore/coreIrepositories/snakePositionRepository";
import GameBoardPositionEntity from "../../applicationCore/entities/gameBoardPositionEntity";
import SnakePlayerEntity from "../../applicationCore/entities/snakePlayerEntity";
import { GetDaySecondsOfToday, GetMinutesOfToday } from "../../applicationCore/utils/getDaytime";
import getLinearCongruentialGenerator from '../../applicationCore/utils/generateRandom';
import BoardPosition from '../entities/gameBoardPosition';
import { AppDataSource } from "../data-source";

export default class SnakePositionRepository implements ISnakePositionRepository {
    async MoveSnakeForwards(id: number): Promise<Boolean> {
        return

    }
    async GetSnakePositions(id: number): Promise<GameBoardPositionEntity[]> {
        return

    }
    async RemoveSnake(): Promise<void> {

    }
    async StartAutoMovemenvent(): Promise<void> {

    }
    async CreateSnakePlayer(snakePlayerEntity: SnakePlayerEntity, size: number): Promise<GameBoardPositionEntity> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(BoardPosition)
        const boardPosition = new BoardPosition()
        boardPosition.IdPlayer  = snakePlayerEntity.getPLayerId();
        boardPosition.positionType = 'head'
        boardPosition.xPosition = getLinearCongruentialGenerator(GetDaySecondsOfToday(),Math.round(size),size)
        boardPosition.yPosition = getLinearCongruentialGenerator(GetMinutesOfToday(),Math.round(size),size)
        //repository.findOneBy( { where:
       //     { xPosition: 1 }
      //  })

        return
    }
}