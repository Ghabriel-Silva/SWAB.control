import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./Company";
import { Operator } from "./Operator";
import { User } from "./User";

@Entity('laboratory')
export class Laboratory {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 100 })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Company, company => company.laboratories)
    @JoinColumn({ name: 'companyId' })
    company: Company

    //relacinamento com operadores
    @OneToMany(() => Operator, operator => operator.laboratory)
    operators: Operator[]


    @OneToMany(()=>User, user =>user.laboratory)
    users:User[]
}