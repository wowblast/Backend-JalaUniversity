import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AccountReportEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
  
    @Column({ type: 'date' })
    dateReport: string

    @Column()
    downloadedFilesAmount: number

    @Column()
    downloadedAmountInBytes: number
}