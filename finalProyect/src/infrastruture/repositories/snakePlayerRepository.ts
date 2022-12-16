import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import { ISnakePlayerRepository } from '../../applicationCore/coreIrepositories/snakePlayeRepository';
import { AppDataSource } from '../data-source';
import SnakePlayer from '../entities/snakePlayer';
import SnakePlayerMapper from '../mappers/snakePlayerMapper';
import { injectable } from 'inversify';
@injectable()
export default class SnakePlayerRepository  implements ISnakePlayerRepository{
    async InsertSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<void>    {
        await AppDataSource.initialize();

        const repository = AppDataSource.getRepository(SnakePlayer)
        const snakePlayer: SnakePlayer = SnakePlayerMapper.castToDBEntity(snakePlayerEntity)
        await repository.save(snakePlayer)
        await AppDataSource.destroy()
    }
    
   async UpdateSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<SnakePlayerEntity> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(SnakePlayer)
        const snakePlayer: SnakePlayer = SnakePlayerMapper.castToDBEntity(snakePlayerEntity)
        await repository.save(snakePlayer)
        await AppDataSource.destroy()
        return snakePlayerEntity

    }
    async DeleteSnakePlayer(playerId: number): Promise<void>  {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(SnakePlayer)
        const deletedPlayer:SnakePlayer  = await repository.findOneByOrFail( {
            playerId: playerId
        })
        await repository.delete(deletedPlayer)
        await AppDataSource.destroy()
    }

    async GetSnakePlayer(playerId: number): Promise<SnakePlayerEntity> {
        await AppDataSource.initialize();
        const repository = AppDataSource.getRepository(SnakePlayer)
        const snakePlayer: SnakePlayer  = await repository.findOneByOrFail( {
            playerId: playerId
        })
        const snakePlayerEntity = SnakePlayerMapper.castToDomainEntitiy(snakePlayer)
        await AppDataSource.destroy()
        return snakePlayerEntity
    }
}