import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export default class SnakePlayer {
  @ObjectIdColumn()
  _id: string;
  
  @PrimaryColumn()
    playerId!: number;

  @Column()
    name: string;

  @Column()
    snakeSize: number;

  @Column()
    snakeDirection: string;

  @Column()
    score: number;
}
