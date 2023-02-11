import { Entity, ObjectIdColumn, Column } from "typeorm"



@Entity({ name: "uploads.files" })
export class FileData {
    @ObjectIdColumn()
    _id: string

    @Column()
    length: string

    @Column()
    chunkSize: string

    @Column()
    uploadDate: Date

    @Column()
    status: string

    @Column()
    filename: string

    @Column()
    md5: string

    @Column()
    contentType: string
}