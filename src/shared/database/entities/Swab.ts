import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Operator } from "./Operator";
import { Tank } from "./Tank";
import { SwabCheck } from "./SwabCheck";

@Entity('swabs')
export class Swab {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Operator, operator => operator.swabs)
    operator: Operator;

    @ManyToOne(() => Tank, tank => tank.swabs)
    tank: Tank;

    @Column('varchar', {nullable:true, length:50})
    faucetCode: string

    @OneToOne(() => SwabCheck, check => check.swab, {
        cascade: true
    })
    @JoinColumn({ name: 'swabCheckId' })
    check: SwabCheck

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}