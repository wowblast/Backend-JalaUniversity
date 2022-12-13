export default class Board {
  private boardSize: number
    constructor(boardSize: number) {
      this.boardSize = boardSize
    }
  getBoardSize(): number {
    return this.boardSize
  }
}