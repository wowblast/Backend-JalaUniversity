import { inject, injectable } from "inversify";
import { BoardPositionService } from "../coreInterfaces/BoardPositionService";
import { BoardPositionReposioryID } from '../types.ts/inversifyTypes';
import { BoardPositionRepository } from '../coreIrepositories/boardPositionRepository';
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { BoardPositionType } from '../types.ts/types';

@injectable()
export default class BoardPositionServiceImplementation implements BoardPositionService {

   private boardPositionRepository: BoardPositionRepository
    constructor(@inject(BoardPositionReposioryID) boardPositionRepository: BoardPositionRepository ){
        this.boardPositionRepository = boardPositionRepository

    }

    async GetAllPositions(): Promise<GameBoardPositionEntity[]> {   
        return  await this.boardPositionRepository.GetAllPositions()
    }
    async ClearBoard(): Promise<void> {
        await this.boardPositionRepository.ClearBoard()

    }
    async CreateBoard(boardSize: number):Promise<GameBoardPositionEntity[]> {
        return await this.boardPositionRepository.CreateBoard(boardSize)

    }

    async GetBoardPositionByPosition(xPosition: number, yPosition: number): Promise<GameBoardPositionEntity> {
        return await this.boardPositionRepository.GetPointOnBoard(xPosition, yPosition)
    }

    async UpdateBoardPosition(gameBoardPositionEntity :GameBoardPositionEntity): Promise<GameBoardPositionEntity> {
        await this.boardPositionRepository.UpdatePointOnBoard(gameBoardPositionEntity)
        return gameBoardPositionEntity
    }

    async GetBoardPositionByPlayedId(playerId: number): Promise<GameBoardPositionEntity[]> {
        return this.boardPositionRepository.GetBoardPointsByPlayerID(playerId)
    }

    async GetBoardPointByPlayerIDAndPositionType(playerId: number, boardPositionType: BoardPositionType): Promise<GameBoardPositionEntity> {
        return this.boardPositionRepository.GetBoardPointByPlayerIDAndPositionType(playerId, boardPositionType)
    }

    async DeleteBoardPositionByPlayedId(playerId: number): Promise<void> {
        return this.boardPositionRepository.ClearPointOnBoard(playerId)
    }

    async printBoardOnConsole() {
        const allPositions = await this.boardPositionRepository.GetAllPositions()
            let pos = allPositions[0]
            console.log()
            for (let x = 4; 0 <= x; x--) {
                for (let y = 0; y < 5; y++) {
                    pos = allPositions.filter((poss) => poss.getXPosition() == y && poss.getYPosition() == x)[0]
                    process.stdout.write("[" +pos.getPlayerId()+"] ");
                }
                console.log()            
            }
      }

    async GetAllSnakeHeads(): Promise<GameBoardPositionEntity[]> {
    return await this.boardPositionRepository.GetAllSnakeHeads();
    }

}