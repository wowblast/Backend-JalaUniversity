import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export default class Game {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
    id!: number;

  @Column()
    status: string;

  @Column()
    boardSize: number;

  @Column()
    stepIntervalBySeconds: number;
}
