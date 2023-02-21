import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class FileDataEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @Column()
    downloadedData: number
}