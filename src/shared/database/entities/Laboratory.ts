import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./Company";

@Entity()
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
}