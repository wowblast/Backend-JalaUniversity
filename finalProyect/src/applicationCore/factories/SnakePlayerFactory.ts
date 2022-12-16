import SnakePlayerEntity from '../entities/snakePlayerEntity';
import { InitialScore, DefaultSnakeSize } from '../types.ts/gameConfigs';
import { SnakeDirection } from '../types.ts/types';

export default class SnakePlayerFactory {
    static CreateSnakePlayer(playerId: number, name: string, snakeDirection: SnakeDirection ) {
        return new SnakePlayerEntity(playerId, name, snakeDirection, InitialScore, DefaultSnakeSize)
    }
}