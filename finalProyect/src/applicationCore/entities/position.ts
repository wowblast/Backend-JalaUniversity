export default class Position {    
    private xPosition: number
    private yPosition: number
    
    constructor(xPosition: number, yPosition: number      ) {
        this.xPosition = xPosition
        this.yPosition = yPosition
    }
    getYPosition(): number {
        return this.yPosition
    }
    setYPosition(yPosition: number) {
        this.yPosition = yPosition
    }
    getXPosition(): number {
        return this.xPosition
    }
    setXPosition(xPosition: number) {
        this.xPosition = xPosition
    }

   
}