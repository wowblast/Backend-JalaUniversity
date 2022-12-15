import { inject, injectable } from "inversify"
import { ISnakePlayerService } from "../coreInterfaces/ISnakePlayerService"
import SnakePlayerEntity from "../entities/snakePlayerEntity"
import { ISnakePlayerRepository } from '../coreIrepositories/snakePlayeRepository';
import { SnakePlayerRepositoryID, SnakePositionRepositoryID } from '../types.ts/inversifyTypes';
import { ISnakePositionRepository } from "../coreIrepositories/snakePositionRepository";


@injectable()
export default class SnakePlayerService implements ISnakePlayerService {

    private snakePlayerRepository: ISnakePlayerRepository;
    private snakePositionRepository: ISnakePositionRepository;
    constructor(@inject(SnakePlayerRepositoryID) snakePlayerRepository: ISnakePlayerRepository, @inject(SnakePositionRepositoryID) snakePositionRepository: ISnakePositionRepository ){
        this.snakePlayerRepository = snakePlayerRepository
        this.snakePositionRepository = snakePositionRepository

    }

    CreateSnakePlayer(id: number): Promise<SnakePlayerEntity> {
        this.snakePlayerRepository.CreateSnakePlayer()
        return

    }   
    ChangeSnakePlayerDirecction(id: number): Promise<SnakePlayerEntity> {
        return
        
    }
}
