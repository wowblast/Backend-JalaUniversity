import SnakePlayerEntity from '../entities/snakePlayerEntity'
import { InitialScore, DefaultSnakeSize } from '../types.ts/gameConfigs'
import { SnakeDirection } from '../types.ts/types'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SnakePlayerFactory {
  static CreateSnakePlayer (playerId: number, name: string, snakeDirection: SnakeDirection): SnakePlayerEntity {
    return new SnakePlayerEntity(playerId, name, snakeDirection, InitialScore, DefaultSnakeSize)
  }
}
