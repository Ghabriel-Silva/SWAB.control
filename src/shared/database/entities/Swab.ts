import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Operator } from "./Operator";
import { Tank } from "./Tank";
import { SwabCheck } from "./SwabCheck";
import { Company } from "./Company";

@Entity('swabs')
export class Swab {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: true, unique: true})
    internalCode: string

    @ManyToOne(() => Operator, operator => operator.swabs)
    operator: Operator;

    @ManyToOne(() => Tank, tank => tank.swabs)
    tank: Tank;

    @Column('varchar', { nullable: true, length: 50 })
    faucetCode: string

    @OneToOne(() => SwabCheck, check => check.swab, {
        cascade: true
    })
    check: SwabCheck

    @ManyToOne(() => Company, company => company.swabs)
    @JoinColumn({ name: 'companyId' })
    company: Company

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}