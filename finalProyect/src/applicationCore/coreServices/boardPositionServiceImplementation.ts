import { inject, injectable } from 'inversify';
import { BoardPositionService } from '../coreInterfaces/BoardPositionService';
import { BoardPositionReposioryID } from '../types.ts/inversifyTypes';
import { BoardPositionRepository } from '../coreIrepositories/boardPositionRepository';
import GameBoardPositionEntity from '../entities/gameBoardPositionEntity';
import { BoardPositionType } from '../types.ts/types';

@injectable()
export default class BoardPositionServiceImplementation implements BoardPositionService {
  private readonly boardPositionRepository: BoardPositionRepository;
  constructor (@inject(BoardPositionReposioryID) boardPositionRepository: BoardPositionRepository) {
    this.boardPositionRepository = boardPositionRepository;
  }

  async GetAllPositions (): Promise<GameBoardPositionEntity[]> {
    return await this.boardPositionRepository.GetAllPositions();
  }

  async ClearBoard (): Promise<void> {
    await this.boardPositionRepository.ClearBoard();
  }

  async CreateBoard (boardSize: number): Promise<GameBoardPositionEntity[]> {
    return await this.boardPositionRepository.CreateBoard(boardSize);
  }

  async GetBoardPositionByPosition (xPosition: number, yPosition: number): Promise<GameBoardPositionEntity> {
    return await this.boardPositionRepository.GetPointOnBoard(xPosition, yPosition);
  }

  async UpdateBoardPosition (gameBoardPositionEntity: GameBoardPositionEntity): Promise<GameBoardPositionEntity> {
    await this.boardPositionRepository.UpdatePointOnBoard(gameBoardPositionEntity);
    return gameBoardPositionEntity;
  }

  async GetBoardPositionByPlayedId (playerId: number): Promise<GameBoardPositionEntity[]> {
    return await this.boardPositionRepository.GetBoardPointsByPlayerID(playerId);
  }

  async GetBoardPointByPlayerIDAndPositionType (playerId: number, boardPositionType: BoardPositionType): Promise<GameBoardPositionEntity> {
    return await this.boardPositionRepository.GetBoardPointByPlayerIDAndPositionType(playerId, boardPositionType);
  }

  async ClearBoardPositionByPositionId (positionId: number): Promise<void> {
    return await this.boardPositionRepository.ClearPointOnBoard(positionId);
  }

  async GetAllSnakeHeads (): Promise<GameBoardPositionEntity[]> {
    return await this.boardPositionRepository.GetAllSnakeHeads();
  }
}
