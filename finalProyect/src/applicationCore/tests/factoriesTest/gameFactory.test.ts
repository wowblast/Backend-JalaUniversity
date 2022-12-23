import "reflect-metadata";
import GameFactory from '../../factories/gameFactory';


describe('game  factory', () => {  

  test('should convert an object into a game instance object', async () => {
    const dataObject = {
        id: 1,
        stepIntervalBySeconds: 2,
        gameStatus: 'Ready',
        boardSize: 5       
    };
    const gameObject = GameFactory.CreateGame(dataObject.id, dataObject.stepIntervalBySeconds, dataObject.boardSize);
    expect({...gameObject}).toStrictEqual(dataObject);
  });
});