import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AnalysisDefinition } from "./AnalysisDefinition";
import { Company } from "./Company";

//Essa tabela representa o grupo de analises(ex: microbiologia contera certas analises)
@Entity('analisyCategory')
export class AnalisysCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    name: string

    @Column('varchar')
    description: string

    @Column('boolean', { default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => AnalysisDefinition, analisyDefinition => analisyDefinition.category)
    analysis: AnalysisDefinition[]

    @ManyToOne(() => Company, company => company.analysesCategory)
    @JoinColumn({ name: 'companyId' })
    company: Company
}