import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LimitType } from "../../types/limite-type";
import { SwabCheck } from "./SwabCheck";
import { AnalysisDefinition } from "./AnalysisDefinition";
import { SwabCheckResult } from "../../../modules/swab/domain/swabResult.enum";

@Entity('analyses_Result')
export class AnalysisResult {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    analysisName: string;

    @Column({ nullable: true })
    unit?: string;

    @Column({
        type: "enum",
        enum: LimitType
    })
    limitType: LimitType;

    @Column("decimal", {
        precision: 10,
        scale: 2,
        nullable: true
    })
    minValue?: number;

    @Column("decimal", {
        precision: 10,
        scale: 2,
        nullable: true
    })
    maxValue?: number;

    @Column({
        nullable: true
    })
    value?: string;

    @Column({
        nullable: true
    })
    observation?: string;

    @Column({
        type: "enum",
        enum: SwabCheckResult,
        nullable: true
    })
    result?: SwabCheckResult;

    @Column({
        default: false
    })
    completed: boolean;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(
        () => SwabCheck,
        check => check.analysesResults
    )
    @JoinColumn({ name: "check_id" })
    check: SwabCheck;

    @ManyToOne(
        () => AnalysisDefinition,
        analysis => analysis.checkAnalyses
    )
    @JoinColumn({ name: "analysis_definition_id" })
    analysis: AnalysisDefinition;

}