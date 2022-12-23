import "reflect-metadata";
import GameBoardPositionFactory from "../../factories/gameBoardPositionFactory";
import { BoardPositionType, SnakeDirection } from '../../types.ts/types';


describe('game board positon factory', () => {  

  test('should convert an object into a gameboard object', async () => {
    const dataObject = {
        positionId: 1,
        playedId: 2,
        snakeBodyIdentifier: 0,
        xPosition: 0,
        yPosition: 0,
        boardPositionType: 'empty',
        snakeDirection: '-'
    };
    const gameBoardObject = GameBoardPositionFactory.CreateGameBoardPosition(dataObject.positionId, dataObject.playedId, dataObject.snakeBodyIdentifier, dataObject.xPosition,
        dataObject.yPosition, dataObject.boardPositionType as BoardPositionType, dataObject.snakeDirection as SnakeDirection);
    expect({...gameBoardObject}).toStrictEqual(dataObject);
  });
});