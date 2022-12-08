import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id!: number
    
    @Column()
    name: string

    @Column()
    lastName: string    

}