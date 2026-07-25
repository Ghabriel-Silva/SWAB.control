import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./Company";
import { Swab } from "./Swab";

@Entity('location')
export class Location {
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

    @Column('boolean', { default: true })
    createAt: boolean

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Company, company => company.locations)
    @JoinColumn({ name: 'companyId' })
    company: Company

    @OneToMany(() => Swab, swab => swab.location)
    swabs: Swab[]
}