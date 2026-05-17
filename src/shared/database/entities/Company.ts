import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Laboratory } from "./Laboratory";
import { OperatorPosition } from "./OperatorPosition";
import { Operator } from "./Operator";
import { Tank } from "./Tank";
import { Swab } from "./Swab";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 50 })
    name: string

    @Column('varchar', { unique: true })
    slug: string

    @Column('varchar', { length: 100 })
    address: string

    @Column('boolean', { default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //relações
    @OneToMany(() => Swab, swab => swab.company)
    swabs: Swab[]

    @OneToMany(() => User, user => user.company)
    users: User[]

    @OneToMany(() => Laboratory, laboratory => laboratory.company)
    laboratories: Laboratory[]

    @OneToMany(() => OperatorPosition, operatorPosition => operatorPosition.company)
    operatorsPosition: OperatorPosition[]

    //relation Operator
    @OneToMany(() => Operator, operator => operator.company)
    operators: Operator[]



    @OneToMany(() => Tank, tank => tank.company)
    tanks: Tank[]
}