import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    files: string

    @Column()
    status: string
}