import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class Game {
    @PrimaryColumn()
    id!: number
    
    @Column()
    status: string

    @Column()
    boardSize: number
   
    @Column()
    stepIntervalBySeconds: number
}