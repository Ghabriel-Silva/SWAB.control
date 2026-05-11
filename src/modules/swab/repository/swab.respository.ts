import { Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Tank } from "../../../shared/database/entities/Tank";
import { SwabCheckType } from "../../SwabCheck/domain/swabCheck.enum";
import { SwabCheckResult } from "../../SwabCheck/domain/swabResult.enum";


class SwabRepository {
    private swabRepository: Repository<Swab>
    private tankRepository: Repository<Tank>

    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
        this.tankRepository = AppDataSource.getRepository(Tank)
    }

    create = async (
        tank: Tank,
        type: SwabCheckType
    ) => {
        const swab = this.swabRepository.create({
            tank,
            check: {
                type: type,
                result: SwabCheckResult.PENDING,
            },
        })
        const res = await this.swabRepository.save(swab)

        return res
    }

    existTank = async (tank: string, payloud: MyJwtPayload) => {
        return await this.tankRepository.findOne({
            where: {
                name: tank,
                company: {
                    id: payloud.companyId
                },
            },
        })
    }
    historySwab = async (tanks: string, payloud: MyJwtPayload, frequencyATP: number) => {
        const res =  await this.swabRepository.find({
            where: {
                tank: {
                    id: tanks,
                    company: {
                        id: payloud.companyId
                    },
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
        console.log(JSON.stringify(res, null, 2))
        return res
    }
}

export default SwabRepository