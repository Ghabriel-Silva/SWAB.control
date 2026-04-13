import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Company {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({})
    name:string

}