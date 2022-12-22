import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class SnakePlayer {
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
