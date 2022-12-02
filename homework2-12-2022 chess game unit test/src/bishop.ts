import Piece from './piece';
import Position from './position';
import { filePos, rankPos } from './types';
export default class Bishop extends Piece {
    canMoveTo(position: Position): boolean {
        const myPostion = this.getPosition()

        const getXYPoints = this.getXYPoints(position);

        if (position.getFile() == myPostion.getFile() &&
        position.getRank() == myPostion.getRank()) {
            return false

        }
        else if(getXYPoints.x1 == getXYPoints.x2 || getXYPoints.y2 == getXYPoints.y1){
            return false
        }
        else {
            return (getXYPoints.y2 - getXYPoints.y1)/ (getXYPoints.x2 - getXYPoints.x1) == 1 || (getXYPoints.y2 - getXYPoints.y1)/ (getXYPoints.x2 - getXYPoints.x1)  == -1
        }
    }

    getXYPoints(position: Position) {
        return {x1: rankPos[filePos.indexOf(position.getFile())],
             x2: rankPos[filePos.indexOf(this.getPosition().getFile())],
             y1: rankPos[rankPos.indexOf(position.getRank())],
             y2: rankPos[rankPos.indexOf(this.getPosition().getRank())]
        }
    }

   
}