import { inject, injectable } from "inversify";
import { IBoardPositionService } from "../coreInterfaces/IBoardPositionService";
import { BoardPositionReposioryID } from '../types.ts/inversifyTypes';
import { IBoardPositionRepository } from '../coreIrepositories/boardPositionRepository';
import GameBoardPositionEntity from "../entities/gameBoardPositionEntity";

@injectable()
export default class BoardPositionService implements IBoardPositionService {

   private boardPositionRepository: IBoardPositionRepository
    constructor(@inject(BoardPositionReposioryID) boardPositionRepository: IBoardPositionRepository ){
        this.boardPositionRepository = boardPositionRepository

    }

    async GetAllPositions(): Promise<GameBoardPositionEntity[]> {
        return  await this.boardPositionRepository.GetAllPositions()

    }
    async ClearBoard(): Promise<void> {
        await this.boardPositionRepository.ClearBoard()

    }
    async CreateBoard(size: number):Promise<GameBoardPositionEntity[]> {
        console.log("service")
        return await this.boardPositionRepository.CreateBoard(size)

    }
}