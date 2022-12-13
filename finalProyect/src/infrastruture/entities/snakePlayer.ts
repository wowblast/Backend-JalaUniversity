import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class SnakePlayer {
    @PrimaryColumn()
    playerId!: number
    
    @Column()
    size: number

    @Column()
    direction: string

    @Column()
    score: number
}