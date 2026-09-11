import { SelectQueryBuilder } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import AppError from "../../../shared/errors/AppError"
import { GetOperatorType } from "../dto/schemas/get.operator"
import OperatorRepository from "../repository/operator.repository"
import { MetaFilter, SwabFilterResponse } from "../../../shared/types/filters.response"


class GetOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = async (companyId: string, dataQuery: GetOperatorType): Promise<SwabFilterResponse<Operator[]>> => {
        const page = Number(dataQuery.page ?? 1)
        const limit = Number(dataQuery.limit ?? 10)

        const newDataQuery = {
            ...dataQuery,
            page,
            limit
        }

        const resp = await this.operatorRepository.getOperator(companyId, newDataQuery)

        const meta: MetaFilter = {
            limit: limit,
            page: page,
            total: resp.total,
            totalPages: Math.ceil((resp.total / limit))
        }

        if (resp.data.length === 0) {
            throw new AppError(
                404,
                'Nenhum Operador encontrado'
            )
        }

        return {
            data: resp.data,
            meta
        } as SwabFilterResponse<Operator[]>
    }
}

export default GetOperator