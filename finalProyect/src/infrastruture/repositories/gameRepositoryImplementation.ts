import GameRepository from '../../applicationCore/coreIrepositories/gameRepository';
import { AppDataSource } from '../data-source';
import GameEntity from '../../applicationCore/entities/gameEntity';
import Game from '../entities/game';
import GameMapper from '../mappers/gameMapper';
import { injectable } from 'inversify';
import { Repository } from 'typeorm';
@injectable()
export default class GameRepositoryImplementation  implements GameRepository{

    private repository: Repository<Game>

    constructor() {
        this.repository = AppDataSource.getRepository(Game)

    }

    setRepository(repository: Repository<Game>) {
        this.repository = repository
    }
    
    async InsertGameInstance(gameEntity: GameEntity): Promise<void>    {
        const gameInstance: Game = GameMapper.castToDBEntity(gameEntity)
        await this.repository.save(gameInstance)
    }
    
   async UpdateGameInstance(gameEntity: GameEntity): Promise<GameEntity> {
        const gameInstance: Game = GameMapper.castToDBEntity(gameEntity)
        await this.repository.save(gameInstance)
        return gameEntity
    }
    async DeleteGameInstance(id: number): Promise<void>  {
        const deletedGame:Game  = await this.repository.findOneByOrFail( {
            id
        })
        await this.repository.delete(deletedGame)
    }

    async GetGameInstance(id: number): Promise<GameEntity> {
        const gameInstance: Game  = await this.repository.findOneByOrFail( {
            id
        })
        const gameEntity = GameMapper.castToDomainEntitiy(gameInstance)

        return gameEntity
    }
}