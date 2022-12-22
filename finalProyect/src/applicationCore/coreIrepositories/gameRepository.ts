/* eslint-disable semi */
import GameEntity from '../entities/gameEntity';

export default interface GameRepository {
  InsertGameInstance: (gameEntity: GameEntity) => Promise<void>
  GetGameInstance: (id: number) => Promise<GameEntity>
  UpdateGameInstance: (gameEntity: GameEntity) => Promise<GameEntity>
  DeleteGameInstance: (id: number) => Promise<void>

}
