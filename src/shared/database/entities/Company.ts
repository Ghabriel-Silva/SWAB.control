import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Laboratory } from "./Laboratory";
import { OperatorPosition } from "./OperatorPosition";
import { Operator } from "./Operator";
import { Location } from "./Location";
import { Swab } from "./Swab";
import { AnalisysCategory } from "./AnalysisCategory";

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

    @Column('int', { nullable: true })
    defaultAtpLimit: number

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

    //Relação com Categorias de analises
    @OneToMany(() => AnalisysCategory, category => category.company)
    analysesCategory: AnalisysCategory[]

    



    @OneToMany(() => Location, location => location.company)
    locations: Location[]
}