import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Laboratory } from "./Laboratory";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {length: 50 })
    name: string

    @Column('varchar', {unique: true })
    slug:string

    @Column('varchar', {length: 100 })
    address: string

    @Column('boolean', {default:true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //relações
    @OneToMany(()=> User, user => user.company)
    users:User[]

    @OneToMany(()=>Laboratory, laboratory => laboratory.company)
    laboratories:Laboratory[]
}