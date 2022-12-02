import King from './king';
import Queen from './queen';
export default class Game {
    private pieces=  Game.makePieces();

    private static makePieces(){
        return [
            new King('White','E',1),
            new King('Black','E',8),
            new Queen('Black','D',1),
            new Queen('Black','D',8)
        ]
    }

}