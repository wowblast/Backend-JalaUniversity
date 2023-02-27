import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    downloadedData: number
    
    @Column()
    timesDownloaded: number;
}