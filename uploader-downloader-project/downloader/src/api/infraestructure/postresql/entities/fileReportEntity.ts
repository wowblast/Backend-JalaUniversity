import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class FileReportEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @Column({ type: 'date' })
    dateReport: string

    @Column()
    downloadedFilesAmount: number

    @Column()
    downloadedAmountInBytes: number
}