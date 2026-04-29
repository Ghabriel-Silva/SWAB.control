import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../../modules/user/domain/role.enum";
import { Company } from "./Company";
import { Laboratory } from "./Laboratory";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 50 })
    name: string

    @Column('varchar', { unique: true, length: 50 })
    email: string

    @Column('varchar', { length: 100 })
    password: string


    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.LAB
    })
    role: UserRole

    @Column('boolean', { default:true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //N:1 foreign key
    @ManyToOne(() => Company, company => company.users)
    @JoinColumn({ name: 'companyId' })
    company: Company

    //relacionamento com laboratorio caso o usuario seja LAB 
    @ManyToOne(()=>Laboratory,laboratory => laboratory.users, {nullable: true})
    @JoinColumn({ name: 'laboratoryId' })
    laboratory?:Laboratory
}
