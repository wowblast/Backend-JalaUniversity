import GameRepository from '../../applicationCore/coreIrepositories/gameRepository';
import { AppDataSource } from '../data-source';
import GameEntity from '../../applicationCore/entities/gameEntity';
import Game from '../entities/game';
import GameMapper from '../mappers/gameMapper';
import { injectable } from 'inversify';
import { MongoRepository } from 'typeorm';
@injectable()
export default class GameRepositoryImplementation implements GameRepository {
  private repository: MongoRepository<Game>;

  constructor () {
    this.repository = AppDataSource.getMongoRepository(Game);
  }

  setRepository (repository: MongoRepository<Game>): void {
    this.repository = repository;
  }

  async InsertGameInstance (gameEntity: GameEntity): Promise<void> {
    const gameInstance: Game = GameMapper.castToDBEntity(gameEntity);
    await this.repository.save(gameInstance);
  }

  async UpdateGameInstance (gameEntity: GameEntity): Promise<GameEntity> {
    const gameInstance: Game = GameMapper.castToDBEntity(gameEntity);
    const currentInstance: Game = await this.repository.findOneByOrFail({id: gameInstance.id});
    const updateGame = {...gameInstance, _id: currentInstance._id};
    await this.repository.save(updateGame);
    return gameEntity;
  }

  async DeleteGameInstance (id: number): Promise<void> {
    const deletedGame: Game = await this.repository.findOneByOrFail({
      id
    });
    await this.repository.delete(deletedGame);
  }

  async GetGameInstance (id: number): Promise<GameEntity> {
    const gameInstance: Game = await this.repository.findOneByOrFail({
      id
    });
    const gameEntity = GameMapper.castToDomainEntitiy(gameInstance);
    return gameEntity;
  }
}
