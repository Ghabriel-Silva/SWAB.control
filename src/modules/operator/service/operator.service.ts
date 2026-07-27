import { CreateOperatorType } from "../dto/schemas/create.operator"
import { CreateOperator } from "./create.operator.service"
import GetOperator from "./get.operator.service"
class OperatorService {
    constructor(
        private operatorGet: GetOperator,
        private operatorCreate: CreateOperator
    ) { }

    getOperators = async (companyId: string) => {
        return this.operatorGet.execute(companyId)
    }

    createOperator = async (companyId: string, data: CreateOperatorType) => {
        return this.operatorCreate.execute(companyId, data)
    }
}


export default OperatorService