import { SelectQueryBuilder } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import AppError from "../../../shared/errors/AppError"
import { GetOperatorType } from "../dto/schemas/get.operator"
import OperatorRepository from "../repository/operator.repository"


class GetOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = async (companyId: string, dataParams: GetOperatorType) => {
        const resp = await this.operatorRepository.getOperator(companyId, dataParams)
    
        if (resp.operators.length === 0) {
            throw new AppError(
                404,
                'Nenhum Operador encontrado'
            )
        }

        return resp
    }
}

export default GetOperator