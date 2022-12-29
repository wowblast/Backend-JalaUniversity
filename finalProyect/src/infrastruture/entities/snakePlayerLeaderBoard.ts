
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export default class SnakePlayerLeaderBoard {

  @ObjectIdColumn()
  _id: string;
  
  @PrimaryColumn()
    id!: number;

  @Column()
    playerId: number;

  @Column()
    name: string;

  @Column()
    score: number;
}
