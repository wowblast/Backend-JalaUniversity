import "reflect-metadata";
import SnakePlayerFactory from '../../factories/SnakePlayerFactory';
import { SnakeDirection } from '../../types.ts/types';


describe('snake player factory', () => {  

  test('should convert an object into a snake player object', async () => {
    const dataObject = {
        playerId: 1,
        name: "test",
        snakeDirection: 'UP',
        score: 0,
        snakeSize:1
    };
    const gameObject = SnakePlayerFactory.CreateSnakePlayer(dataObject.playerId, dataObject.name, dataObject.snakeDirection as SnakeDirection);
    expect({...gameObject}).toStrictEqual(dataObject);
  });
});