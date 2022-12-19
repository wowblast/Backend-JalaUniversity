import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import { SnakePlayerRepository } from '../../applicationCore/coreIrepositories/snakePlayeRepository';
import { AppDataSource } from '../data-source';
import SnakePlayer from '../entities/snakePlayer';
import SnakePlayerMapper from '../mappers/snakePlayerMapper';
import { injectable } from 'inversify';
import { Repository } from 'typeorm';
@injectable()
export default class SnakePlayerRepositoryImplementation  implements SnakePlayerRepository{
    private repository: Repository<SnakePlayer>

    constructor() {
        this.repository = AppDataSource.getRepository(SnakePlayer)

    }

    setRepository(repository: Repository<SnakePlayer>) {
        this.repository = repository
    }
    async InsertSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<void>    {

        const snakePlayer: SnakePlayer = SnakePlayerMapper.castToDBEntity(snakePlayerEntity)
        await this.repository.save(snakePlayer)
    }
    
   async UpdateSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<SnakePlayerEntity> {
        const snakePlayer: SnakePlayer = SnakePlayerMapper.castToDBEntity(snakePlayerEntity)
        await this.repository.save(snakePlayer)
        return snakePlayerEntity

    }
    async DeleteSnakePlayer(playerId: number): Promise<void>  {
        const deletedPlayer:SnakePlayer  = await this.repository.findOneByOrFail( {
            playerId: playerId
        })
        await this.repository.delete(deletedPlayer)
    }

    async GetSnakePlayer(playerId: number): Promise<SnakePlayerEntity> {
        const snakePlayer: SnakePlayer  = await this.repository.findOneByOrFail( {
            playerId: playerId
        })
        const snakePlayerEntity = SnakePlayerMapper.castToDomainEntitiy(snakePlayer)
        return snakePlayerEntity
    }
}