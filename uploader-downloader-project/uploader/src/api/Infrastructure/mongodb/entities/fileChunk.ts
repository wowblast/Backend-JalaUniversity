import { Entity, ObjectIdColumn, Column, Binary } from "typeorm"



@Entity({ name: "uploads.chunks" })
export class FileChunk {
    @ObjectIdColumn()
    _id: string

    @Column()
    files_id: string

    @Column()
    n: number

    @Column()
    data: object  
}