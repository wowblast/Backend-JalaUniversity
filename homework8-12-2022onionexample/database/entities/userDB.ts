import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class UserDB {
    @PrimaryColumn()
    id!: number
    
    @Column()
    name: string

    @Column()
    lastName: string    

}