import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OperatorPosition } from "./OperatorPosition";
import { Company } from "./Company";
import { Laboratory } from "./Laboratory";
import { Swab } from "./Swab";

@Entity('operator')
export class Operator {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 50 })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //Relacionamento com operator position
    @ManyToOne(() => OperatorPosition, position => position.operators)
    @JoinColumn({ name: 'positionId' })
    position: OperatorPosition

    //Operador pertence a company e aponta para ela 
    @ManyToOne(() => Company, company => company.operators) 
    @JoinColumn({ name: 'companyId' })
    company: Company

    //Relacionamento e foreing key de lab
    @ManyToOne(() => Laboratory, lab => lab.operators)
    @JoinColumn({ name: 'laboratoryId' })
    laboratory: Laboratory

    @OneToMany(() => Swab, swab => swab.operator)
    swabs: Swab[]
}
