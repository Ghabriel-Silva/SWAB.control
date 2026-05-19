import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Company } from "./Company";

@Entity("swab_sequence")
@Unique(["companyId", "prefix"])
export class SwabSequence {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "companyId" })
    companyId: string;

    @Column()
    prefix: string;

    @Column({ type: "int", default: 0 })
    lastNumber: number;

    @ManyToOne(() => Company)
    @JoinColumn({ name: "companyId", referencedColumnName: "id" })
    company: Company;
}