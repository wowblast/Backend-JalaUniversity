
import BoardPosition from '../entities/gameBoardPosition';
import { AppDataSource } from "../data-source";
import GameBoardPositionMapper from "../mappers/gameBoardPositionMapper";
import { SnakeDirection } from "../../applicationCore/types.ts/types";
import { injectable } from 'inversify';
import { Repository } from "typeorm";
import GameBoardPositionEntity from "../../applicationCore/entities/gameBoardPositionEntity";

@injectable()
export default class SnakePositionRepositoryImplementation {
    
    private repository: Repository<BoardPosition>
    constructor() {
        this.repository = AppDataSource.getRepository(BoardPosition)
    }

    
}