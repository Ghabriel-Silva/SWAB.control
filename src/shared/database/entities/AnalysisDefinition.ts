import {Column,CreateDateColumn,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn,UpdateDateColumn} from "typeorm";
import { LimitType } from "../../types/limite-type";
import { AnalisysCategory } from "./AnalysisCategory";
import { AnalysisResult } from "./AnalysisResult";

@Entity("analysis_definitions")
export class AnalysisDefinition {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description?: string;

    @Column({
        length: 50,
        nullable: true
    })
    unit?: string;

    @Column({
        type: "enum",
        enum: LimitType,
        default: LimitType.MAX
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
        default: true
    })
    active: boolean;

    @ManyToOne(
        () => AnalisysCategory,
        category => category.analysis
    )
    @JoinColumn({ name: "category_id" })
    category: AnalisysCategory;

    @OneToMany(
        () => AnalysisResult,
        checkAnalysis => checkAnalysis.analysis
    )
    checkAnalyses: AnalysisResult[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}