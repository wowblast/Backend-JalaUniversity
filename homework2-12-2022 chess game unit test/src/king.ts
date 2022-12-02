import Piece from './piece';
import Position from './position';
import { filePos, rankPos } from './types';
export default class King extends Piece {
    canMoveTo(position: Position): boolean {
        const myPostion = this.getPosition()
        

        if (position.getFile() == myPostion.getFile() &&
        position.getRank() == myPostion.getRank()) {
            return false

        } else {
            const myPostion = this.getPosition()
            const indexFile = filePos.indexOf(myPostion.getFile())
            const indexRank = rankPos.indexOf(myPostion.getRank())
            const filePosibilities = this.getPosibilities(indexFile,filePos)
            const rankPosibilities = this.getPosibilities(indexRank,rankPos)
           
        return filePosibilities.includes(position.getFile()) && rankPosibilities.includes(position.getRank());  
        }
        
    }

    getPosibilities(index: number, positionArray: string[] | number[]) {
        
        if(index == 0) {
          return [positionArray[index],positionArray[index+1]];
        }
        else if(index == positionArray.length -1 ){
            return [positionArray[index-1], positionArray[index]]

        } else {
            return [positionArray[index-1], positionArray[index], positionArray[index+1]]
        }
    }
}