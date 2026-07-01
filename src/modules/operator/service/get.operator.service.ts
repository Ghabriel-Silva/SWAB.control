import { Operator } from "../../../shared/database/entities/Operator"
import AppError from "../../../shared/errors/AppError"
import OperatorRepository from "../repository/operator.repository"


class GetOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = async (companyId: string): Promise<Operator[]> => {
        const resp = await this.operatorRepository.getOperator(companyId)

        if (!resp) {
            throw new AppError(
                404,
                'Nenhum Operador encontrado'
            )
        }

        return resp
    }
}

export default GetOperator