import { In, Like, Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Tank } from "../../../shared/database/entities/Tank";
import { SwabCheckType } from "../domain/swabCheck.enum";
import { SwabCheckResult } from "../domain/swabResult.enum";
import { SwabSequence } from "../../../shared/database/entities/SwabSequence";


class SwabCreateRepository {
    private swabRepository: Repository<Swab>
    private tankRepository: Repository<Tank>
    private swabSequence: Repository<SwabSequence>

    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
        this.tankRepository = AppDataSource.getRepository(Tank)
        this.swabSequence = AppDataSource.getRepository(SwabSequence)
    }

    create = async (
        tank: Tank,
        type: SwabCheckType,
        companyId: string,
        internalCode: string
    ) => {
        const swab = this.swabRepository.create({
            tank,
            internalCode,
            company: {
                id: companyId
            },
            check: {
                type: type,
                result: SwabCheckResult.PENDING,
            },
        })
        const res = await this.swabRepository.save(swab)

        return res
    }

    async ensure(companyId: string, prefix: string) {
        try {
            const existing = await this.swabSequence.findOne({
                where: { companyId, prefix }
            })

            if (existing) {
                return
            }

            const newSequence = this.swabSequence.create({
                companyId,
                prefix,
                lastNumber: 0
            })

            await this.swabSequence.save(newSequence)

        } catch (error) {
            console.log(" ensure error", error)
        }
    }

    async nextSequence(companyId: string, prefix: string): Promise<number> {
        await this.swabSequence
            .createQueryBuilder()
            .update(SwabSequence)
            .set({ lastNumber: () => "lastNumber + 1" })
            .where("companyId = :companyId AND prefix = :prefix", { companyId, prefix })
            .execute();

        const sequence = await this.swabSequence.findOne({
            where: { companyId, prefix }
        })

        return sequence!.lastNumber;
    }

    existTank = async (tanks: string[], payloud: MyJwtPayload): Promise<Tank[]> => {
        return await this.tankRepository.find({
            where: {
                name: In(tanks),
                company: {
                    id: payloud.companyId
                },
            },
        })
    }
    historySwab = async (tanks: string, payloud: MyJwtPayload, frequencyATP: number) => {
        const res = await this.swabRepository.find({
            where: {
                tank: {
                    id: tanks,
                    company: {
                        id: payloud.companyId
                    }
                }
            },
            relations: {
                check: true,
                tank: true
            },
            order: {
                createdAt: "DESC"
            },
            take: frequencyATP
        })

        return res
    }
}

export default SwabCreateRepository