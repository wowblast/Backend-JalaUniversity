import { IBoardPositionRepository } from '../../applicationCore/coreIrepositories/boardPositionRepository';
import BoardPosition from '../../applicationCore/entities/boardPosition';
import { PositionType } from '../../applicationCore/types.ts/types';
export default class BoardPositionRepository implements IBoardPositionRepository {
    CreateBoard(size: number):BoardPosition[] {
        return []
    }
    MoveSnakeForwars(id: number): BoardPosition {
        return null
    }
    
    GetAllPositions(): BoardPosition[] {
        return []
    }
    ClearBoard(): BoardPosition[] {
        return
    }
    CreateSnakePlayer(id: number, xPostion: number, yPostion: number, positionType:PositionType): BoardPosition   {
        return
    }
    
}