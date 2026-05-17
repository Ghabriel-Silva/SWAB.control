import { Not, Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Operator } from "../../../shared/database/entities/Operator";
import { SwabCheck } from "../../../shared/database/entities/SwabCheck";


class SwabUpdateRepository {
    private swabUpdateRepository: Repository<Swab>
    private operatorRepository: Repository<Operator>
    private swabCheckRepository: Repository<SwabCheck>

    constructor() {
        this.swabUpdateRepository = AppDataSource.getRepository(Swab)
        this.operatorRepository = AppDataSource.getRepository(Operator)
        this.swabCheckRepository = AppDataSource.getRepository(SwabCheck)
    }

    updateSwab = async (
        data: Partial<Swab>,
        swabId: string,
        companyId: string
    ) => {

        const { check, ...swabData } = data

        await this.swabUpdateRepository
            .createQueryBuilder()
            .update(Swab)
            .set(swabData)
            .where("id = :swabId", { swabId })
            .andWhere("companyId = :companyId", { companyId })
            .execute()

        if (check) {
            await this.swabCheckRepository
                .createQueryBuilder()
                .update(SwabCheck)
                .set(check)
                .where("swabId = :swabId", { swabId })
                .execute()
        }
    }

    swabexiste = async (id: string, companyId: string) => {
        return await this.swabUpdateRepository.findOne({
            where: {
                id,
                company: {
                    id: companyId
                }
            },
            relations: {
                tank: true,
            }
        })
    }

    lastfacet = async (tankId: string, companyId: string, swabId: string) => {
        return await this.swabUpdateRepository.findOne({
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
                createdAt: 'DESC'
            }
        })
    }
    operatorExiste = async (id: string, companyId: string) => {
        return await this.operatorRepository.findOne({
            where: {
                id,
                company: {
                    id: companyId
                }

            }
        })
    }
}
export default SwabUpdateRepository