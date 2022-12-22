import SnakePlayer from '../entities/snakePlayer';
import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import { SnakeDirection } from '../../applicationCore/types.ts/types';
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SnakePlayerMapper {
  static castToDomainEntitiy (snakePlayer: SnakePlayer): SnakePlayerEntity {
    const snakePlayerEntity: SnakePlayerEntity = new SnakePlayerEntity(snakePlayer.playerId, snakePlayer.name, snakePlayer.snakeDirection as SnakeDirection, snakePlayer.score, snakePlayer.snakeSize);
    return snakePlayerEntity;
  }

  static castToDBEntity (snakePlayerEntity: SnakePlayerEntity): SnakePlayer {
    const snakePlayer = new SnakePlayer();
    snakePlayer.name = snakePlayerEntity.getName();
    snakePlayer.playerId = snakePlayerEntity.getPLayerId();
    snakePlayer.score = snakePlayerEntity.getScore();
    snakePlayer.snakeSize = snakePlayerEntity.getSnakeSize();
    snakePlayer.snakeDirection = snakePlayerEntity.getSnakeDirection();
    return snakePlayer;
  }
}
