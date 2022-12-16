import GameRepository from '../../applicationCore/coreIrepositories/gameRepository';
import { AppDataSource } from '../data-source';
import GameEntity from '../../applicationCore/entities/gameEntity';
import Game from '../entities/game';
import GameMapper from '../mappers/gameMapper';
export default class GameRepositoryImplementation  implements GameRepository{
    
    async InsertGameInstance(gameEntity: GameEntity): Promise<void>    {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(Game)
        const gameInstance: Game = GameMapper.castToDBEntity(gameEntity)
        await repository.save(gameInstance)
        await AppDataSource.destroy()
    }
    
   async UpdateGameInstance(gameEntity: GameEntity): Promise<GameEntity> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(Game)
        const gameInstance: Game = GameMapper.castToDBEntity(gameEntity)
        await repository.save(gameInstance)
        await AppDataSource.destroy()
        return gameEntity
    }
    async DeleteGameInstance(id: number): Promise<void>  {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(Game)
        const deletedGame:Game  = await repository.findOneByOrFail( {
            id
        })
        await repository.delete(deletedGame)
        await AppDataSource.destroy()
    }

    async GetGameInstance(id: number): Promise<GameEntity> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(Game)
        const gameInstance: Game  = await repository.findOneByOrFail( {
            id
        })
        const gameEntity = GameMapper.castToDomainEntitiy(gameInstance)
        return gameEntity
    }
}