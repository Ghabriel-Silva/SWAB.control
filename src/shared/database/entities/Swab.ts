import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
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

    @OneToMany(() => SwabCheck, check => check.swab, {
        cascade: true
    })
    checks: SwabCheck[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}