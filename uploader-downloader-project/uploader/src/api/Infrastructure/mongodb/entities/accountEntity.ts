import { Entity, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class AccountEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    email: string

    @Column()
    clientId: string

    @Column()
    clientSecret: string

    @Column()
    redirectUri: string

    @Column()
    refrestToken: string
}