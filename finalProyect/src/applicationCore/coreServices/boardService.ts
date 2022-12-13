import { IBoardService } from '../coreInterfaces/IBoardService';
export default class BoardService implements IBoardService {
    CreateBoard(size: number): void {
        let  board = []
        for(let x = 0; x< size; x++) {
            for(let y = 0; y< size; y++) {
                board.push({x,y, "filled":"empty", "IdPlayer": 0})
            }
        }
        console.log(board)
    }
}