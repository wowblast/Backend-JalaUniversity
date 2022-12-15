import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import { ISnakePlayerRepository } from '../../applicationCore/coreIrepositories/snakePlayeRepository';
import { SnakeDirection } from '../../applicationCore/types.ts/types';
export default class SnakePlayerRepository  implements ISnakePlayerRepository{
    async CreateSnakePlayer(snakePlayerEntity: SnakePlayerEntity): Promise<Boolean>
    {
        return  false
    }
    
    ChangeSnakePlayerDirecction(playerId: number, snakeDirection:SnakeDirection ): GameBoardPositionEntity {
        return

    }
    RemoveSnake(): Promise<void>  {
        return 
    }
}