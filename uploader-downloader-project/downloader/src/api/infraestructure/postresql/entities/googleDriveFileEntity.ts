import { Entity, Column,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoogleDriveFileEntity {
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    email: string

    @Column()
    webViewLink: string

    @Column()
    directDownloadLink: string   

    @Column()
    fileName: string

    @Column()
    fileId: string

    @Column()
    fileSize: number
}