import { Repository } from "typeorm"
import { Swab } from "../../../shared/database/entities/Swab"
import { AppDataSource } from "../../../shared/database/data-source"
import { FilterSwabsQueryType } from "../dto/schemas/filter.swabs.query.schema"
import { MyJwtPayload } from "../../../shared/auth/types/auth.types"


class SwabFilterRepository {
    private swabFilterRepository: Repository<Swab>

    constructor() {
        this.swabFilterRepository = AppDataSource.getRepository(Swab)
    }

    filter = async (filters: FilterSwabsQueryType, payloud: MyJwtPayload) => {
        const query = this.swabFilterRepository
            .createQueryBuilder('swab')
            .leftJoinAndSelect('swab.check', 'check')
            .leftJoinAndSelect('swab.tank', 'tank')
            .leftJoinAndSelect('swab.operator', 'operator')
            .where('swab.company =  :companyId', { companyId: payloud.companyId })

        if (filters.operatorId) {
            query.andWhere('operator.id =  :operatorId', {
                operatorId: filters.operatorId
            })
        }

        if (filters.tankId) {
            query.andWhere('tank.id = :tankId', {
                tankId: filters.tankId
            })
        }

        if (filters.result) {
            query.andWhere('check.result = :result', {
                result: filters.result
            })
        }

        if (filters.internalCode) {
            query.andWhere('swab.internalCode =  :internalCode', {
                internalCode: filters.internalCode
            })
        }

        if (filters.type) {
            query.andWhere('check.type = :type', {
                type: filters.type
            })
        }
        if (filters.startDate && filters.endDate) {
            query.andWhere("swab.createdAt >= :startDate", {
                startDate: filters.startDate,
            })

            query.andWhere("swab.createdAt < :endDate", {
                endDate: filters.endDate
            })
        }

        return await query.getMany()

    }


}
export default SwabFilterRepository