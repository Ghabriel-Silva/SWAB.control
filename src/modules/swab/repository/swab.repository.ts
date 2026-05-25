import { Not, Repository } from "typeorm";
import { AppDataSource } from "../../../shared/database/data-source";
import { Swab } from "../../../shared/database/entities/Swab";
import { SwabCheck } from "../../../shared/database/entities/SwabCheck";
import { SwabCheckResult } from "../domain/swabResult.enum";
import { SwabCheckType } from "../domain/swabCheck.enum";

class SwabRepository {
    private swabRepository: Repository<Swab>
    private swabCheckRepository: Repository<SwabCheck>

    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
        this.swabCheckRepository = AppDataSource.getRepository(SwabCheck)
    }

    create = async (
        tankId: string,
        type: SwabCheckType,
        companyId: string,
        internalCode: string,
        lastFaucet: string
    ) => {
        const swab = this.swabRepository.create({
            internalCode,
            lastFaucetTank: lastFaucet,
            tank: {
                id: tankId
            },
            company: {
                id: companyId
            },
            check: {
                type,
                result: SwabCheckResult.PENDING,
            },
        })

        return await this.swabRepository.save(swab)
    }

    update = async (
        data: Partial<Swab>,
        swabId: string,
        companyId: string
    ): Promise<boolean> => {

        const { check, ...swabData } = data

        const result = await this.swabRepository
            .createQueryBuilder()
            .update(Swab)
            .set(swabData)
            .where("id = :swabId", { swabId })
            .andWhere("companyId = :companyId", { companyId })
            .andWhere("isCancelled = :cancelled", { cancelled: false })
            .execute()

        if (!result.affected) {
            return false
        }

        if (check) {
            await this.swabCheckRepository
                .createQueryBuilder()
                .update(SwabCheck)
                .set(check)
                .where("swabId = :swabId", { swabId })
                .execute()
        }

        return true
    }

    cancel = async (
        swabId: string,
        companyId: string,
        data: Partial<Swab>
    ) => {

        return await this.swabRepository
            .createQueryBuilder()
            .update(Swab)
            .set(data)
            .where("id = :swabId", { swabId })
            .andWhere("companyId = :companyId", { companyId })
            .andWhere("isCancelled = :cancelled", { cancelled: false })
            .execute()
    }

    findById = async (
        swabId: string,
        companyId: string
    ): Promise<Swab | null> => {

        return await this.swabRepository.findOne({
            where: {
                id: swabId,
                isCancelled: false,
                company: {
                    id: companyId
                }
            },
            relations: {
                tank: true,
                company: true,
                check: true
            }
        })
    }

    findLastByTank = async (
        tankId: string,
        companyId: string,
        swabId: string
    ) => {

        return await this.swabRepository.findOne({
            where: {
                tank: {
                    id: tankId
                },
                id: Not(swabId),
                company: {
                    id: companyId
                }
            },
            order: {
                createdAt: "DESC"
            }
        })
    }

    history = async (
        tankId: string,
        companyId: string,
        frequencyATP: number
    ) => {

        return await this.swabRepository.find({
            where: {
                isCancelled: false,
                tank: {
                    id: tankId,
                    company: {
                        id: companyId
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
            take: frequencyATP || 1
        })
    }
}

export default SwabRepository