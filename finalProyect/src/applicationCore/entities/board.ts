export default class Board {
  private readonly boardSize: number
  constructor (boardSize: number) {
    this.boardSize = boardSize
  }

  getBoardSize (): number {
    return this.boardSize
  }
}
