
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class SnakePlayerLeaderBoard {
  @PrimaryColumn()
    id!: number

  @Column()
    playerId: number

  @Column()
    name: string

  @Column()
    score: number
}
