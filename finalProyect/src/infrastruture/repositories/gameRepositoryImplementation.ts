import GameRepository from '../../applicationCore/coreIrepositories/gameRepository';
import { AppDataSource } from '../data-source';
import GameEntity from '../../applicationCore/entities/gameEntity';
import Game from '../entities/game';
import GameMapper from '../mappers/gameMapper';
import { injectable } from 'inversify';
@injectable()
export default class GameRepositoryImplementation  implements GameRepository{
    
    async InsertGameInstance(gameEntity: GameEntity): Promise<void>    {
        const repository = AppDataSource.getRepository(Game)
        const gameInstance: Game = GameMapper.castToDBEntity(gameEntity)
        await repository.save(gameInstance)
    }
    
   async UpdateGameInstance(gameEntity: GameEntity): Promise<GameEntity> {
        const repository = AppDataSource.getRepository(Game)
        const gameInstance: Game = GameMapper.castToDBEntity(gameEntity)
        await repository.save(gameInstance)
        return gameEntity
    }
    async DeleteGameInstance(id: number): Promise<void>  {
        const repository = AppDataSource.getRepository(Game)
        const deletedGame:Game  = await repository.findOneByOrFail( {
            id
        })
        await repository.delete(deletedGame)
    }

    async GetGameInstance(id: number): Promise<GameEntity> {
        const repository = AppDataSource.getRepository(Game)
        const gameInstance: Game  = await repository.findOneByOrFail( {
            id
        })
        const gameEntity = GameMapper.castToDomainEntitiy(gameInstance)

        return gameEntity
    }
}