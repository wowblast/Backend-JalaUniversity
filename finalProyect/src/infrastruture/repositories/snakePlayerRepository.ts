import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import { ISnakePlayerRepository } from '../../applicationCore/coreIrepositories/snakePlayeRepository';
import { AppDataSource } from '../data-source';
import SnakePlayer from '../entities/snakePlayer';
import SnakePlayerMapper from '../mappers/snakePlayerMapper';
import { injectable } from 'inversify';
@injectable()
export default class SnakePlayerRepository  implements ISnakePlayerRepository{
    async InsertSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<void>    {

        const repository = AppDataSource.getRepository(SnakePlayer)
        const snakePlayer: SnakePlayer = SnakePlayerMapper.castToDBEntity(snakePlayerEntity)
        await repository.save(snakePlayer)
    }
    
   async UpdateSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<SnakePlayerEntity> {
        const repository = AppDataSource.getRepository(SnakePlayer)
        const snakePlayer: SnakePlayer = SnakePlayerMapper.castToDBEntity(snakePlayerEntity)
        await repository.save(snakePlayer)
        return snakePlayerEntity

    }
    async DeleteSnakePlayer(playerId: number): Promise<void>  {
        const repository = AppDataSource.getRepository(SnakePlayer)
        const deletedPlayer:SnakePlayer  = await repository.findOneByOrFail( {
            playerId: playerId
        })
        await repository.delete(deletedPlayer)
    }

    async GetSnakePlayer(playerId: number): Promise<SnakePlayerEntity> {
        const repository = AppDataSource.getRepository(SnakePlayer)
        const snakePlayer: SnakePlayer  = await repository.findOneByOrFail( {
            playerId: playerId
        })
        const snakePlayerEntity = SnakePlayerMapper.castToDomainEntitiy(snakePlayer)
        return snakePlayerEntity
    }
}