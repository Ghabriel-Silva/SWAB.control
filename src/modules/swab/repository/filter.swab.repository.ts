import { Repository } from "typeorm"
import { Swab } from "../../../shared/database/entities/Swab"
import { AppDataSource } from "../../../shared/database/data-source"
import { FilterSwabsQueryType } from "../dto/schemas/filter.swabs.query.schema"
import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { RepositoryResponse } from "../dto/types/filter/respository.response"


class SwabFilterRepository {
    private swabFilterRepository: Repository<Swab>

    constructor() {
        this.swabFilterRepository = AppDataSource.getRepository(Swab)
    }

    filter = async (filters: FilterSwabsQueryType, payloud: MyJwtPayload): Promise<RepositoryResponse> => {
        const order: 'ASC' | 'DESC' = filters.order ?? 'DESC'

        const query = this.swabFilterRepository
            .createQueryBuilder('swab')
            .leftJoinAndSelect('swab.check', 'check')
            .leftJoinAndSelect('swab.location', 'location')
            .leftJoinAndSelect('swab.operator', 'operator')
            .where('swab.company =  :companyId', { companyId: payloud.companyId })
            .orderBy('swab.createdAt', order)
            .skip((filters.page! - 1) * filters.limit!)
            .take(filters.limit)

        if (filters.operatorId) {
            query.andWhere('operator.id =  :operatorId', {
                operatorId: filters.operatorId
            })
        }
        if (filters.locationId) {
            query.andWhere('location.id = :locationId', {
                locationId: filters.locationId
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

        if (filters.isCancelled !== undefined) {
            query.andWhere("swab.isCancelled = :isCancelled", {
                isCancelled: filters.isCancelled
            })
        }
        const [swabs, total] = await query.getManyAndCount()

        return {
            swabs,
            total
        } as RepositoryResponse
    }


}
export default SwabFilterRepository