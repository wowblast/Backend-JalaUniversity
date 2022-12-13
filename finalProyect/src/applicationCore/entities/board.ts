export default class Board {
  private size: number
    constructor(size: number) {
      this.size = size
    }
  getSize(): number {
    return this.size
  }
}