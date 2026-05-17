import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm'
import { Swab } from './Swab'
import { SwabCheckType } from '../../../modules/swab/domain/swabCheck.enum';
import { SwabCheckResult } from '../../../modules/swab/domain/swabResult.enum';


@Entity('swab_checks')
export class SwabCheck {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Swab, swab => swab.check, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'swabId' })
    swab: Swab

    @Column({
        type: 'enum',
        enum: SwabCheckType
    })
    type: SwabCheckType

    @Column({
        type: 'enum',
        enum: SwabCheckResult
    })
    result: SwabCheckResult

    @Column({ nullable: true })
    validatedAt: Date

    @Column({ nullable: true })
    valueAtp: number

    @Column({ nullable: true, length: 20 })
    batch: string;

    @Column({ nullable: true, length: 500 })
    observation: string


    @Column({ nullable: true, length: 250 })
    sameFaucetJustification: string

    @CreateDateColumn()
    createdAt: Date;
}