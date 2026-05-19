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
    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
        this.tankRepository = AppDataSource.getRepository(Tank)
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

    nextSwabSequence = async (companyId: string, prefix: string) => {
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const existing = await queryRunner.manager.findOne(SwabSequence, {
                where: { companyId, prefix }
            })

            if (!existing) {
                const newSequence = queryRunner.manager.create(SwabSequence, {
                    companyId,
                    prefix,
                    lastNumber: 0
                })
                await queryRunner.manager.save(newSequence)
            }

            await queryRunner.manager
                .createQueryBuilder()
                .update(SwabSequence)
                .set({ lastNumber: () => "lastNumber + 1" })
                .where("companyId = :companyId AND prefix = :prefix", { companyId, prefix })
                .execute()

            const sequence = await queryRunner.manager.findOne(SwabSequence, {
                where: { companyId, prefix }
            })

            await queryRunner.commitTransaction()

            return sequence!.lastNumber

        } catch (err) {
            await queryRunner.rollbackTransaction()
            throw err
        }finally{
            await queryRunner.release()
        }
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