import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./Company";
import { Swab } from "./Swab";

@Entity('tank')
export class Tank {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 100 })
    name: string

    @Column('int', { default: 3 })
    atpFrequency: number

    @Column('varchar', { length: 600 })
    description: string

    @Column('int', { nullable: true })
    atpLimit: number 

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Company, company => company.tanks)
    @JoinColumn({ name: 'companyId' })
    company: Company

    @OneToMany(() => Swab, swab => swab.tank)
    swabs: Swab[]
}