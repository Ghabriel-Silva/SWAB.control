import { Not, Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Operator } from "../../../shared/database/entities/Operator";


class SwabUpdateRepository {
    private swabUpdateRepository: Repository<Swab>
    private operatorRepository: Repository<Operator>

    constructor() {
        this.swabUpdateRepository = AppDataSource.getRepository(Swab)
        this.operatorRepository = AppDataSource.getRepository(Operator)
    }

    updateSwab = async () => {
        return await this.swabUpdateRepository
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