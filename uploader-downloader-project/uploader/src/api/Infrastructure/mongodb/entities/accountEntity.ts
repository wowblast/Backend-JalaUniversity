import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class AccountEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    googleApiKey: string

    @Column()
    apiKey: string
}