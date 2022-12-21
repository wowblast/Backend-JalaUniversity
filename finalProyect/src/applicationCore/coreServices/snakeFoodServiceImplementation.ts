import { inject, injectable } from 'inversify'
import { SnakeFoodService } from '../coreInterfaces/SnakeFoodService'
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity'
import { BoardPositionServiceID } from '../types.ts/inversifyTypes'
import BoardPositionService from './boardPositionServiceImplementation'

@injectable()
export default class SnakeFoodServiceImplementation implements SnakeFoodService {
  private readonly boardPositionService: BoardPositionService
  constructor (
  @inject(BoardPositionServiceID) boardPositionService: BoardPositionService
  ) {
    this.boardPositionService = boardPositionService
  }

  async InsertFoodPointOnBoard (gameBoardPositionEntity: GameBoardPositionEntity): Promise<void> {
    await this.boardPositionService.UpdateBoardPosition(gameBoardPositionEntity)
  }

  async RemoveFoodPointOnBoard (positionId: number): Promise<void> {
    await this.boardPositionService.ClearBoardPositionByPositionId(positionId)
  }
}
