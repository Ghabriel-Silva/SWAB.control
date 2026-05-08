import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    OneToOne
} from 'typeorm'
import { Swab } from './Swab'
import { SwabCheckType } from '../../../modules/SwabCheck/domain/swabCheck.enum';
import { SwabCheckResult } from '../../../modules/SwabCheck/domain/swabResult.enum';


@Entity('swab_checks')
export class SwabCheck {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Swab, swab => swab.check, {
        onDelete: 'CASCADE'
    })
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
    batch: string;

    @CreateDateColumn()
    createdAt: Date;
}