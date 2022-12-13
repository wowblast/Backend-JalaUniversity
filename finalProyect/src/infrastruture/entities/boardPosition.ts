import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class GameBoardPosition {
    @PrimaryColumn()
    id!: number
    
    @Column()
    xPosition: number

    @Column()
    yPosition: number 
    
    @Column()
    positionType: string
    
    @Column()
    IdPlayer: number

}