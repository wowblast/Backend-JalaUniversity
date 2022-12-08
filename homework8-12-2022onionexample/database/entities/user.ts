import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class User {
    @PrimaryColumn()
    id!: number
    
    @Column()
    name: string

    @Column()
    lastName: string    

}