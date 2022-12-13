export default class Position {    
    private xPosition: number
    private yPosition: number
    
    constructor(xPosition: number, yPosition: number      ) {
        this.xPosition = xPosition
        this.yPosition = yPosition
    }
    public getYPosition(): number {
        return this.yPosition
    }
    public setYPosition(yPosition: number) {
        this.yPosition = yPosition
    }
    public getXPosition(): number {
        return this.xPosition
    }
    public setXPosition(xPosition: number) {
        this.xPosition = xPosition
    }

   
}