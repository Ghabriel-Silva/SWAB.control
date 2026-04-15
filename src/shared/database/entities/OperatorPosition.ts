import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Operator } from "./Operator";
import { Company } from "./Company";

@Entity('operator-position')
export class OperatorPosition {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Operator, operator => operator.position)
    operators: Operator[]

    @ManyToOne(() => Company, company => company.operatorsPosition)
    @JoinColumn({ name: 'companyId' })
    company: Company
}