import { CreateOperatorType } from "../dto/schemas/create.operator"
import { UpdateOperatorType } from "../dto/schemas/update.operator"
import { CreateOperator } from "./create.operator.service"
import GetOperator from "./get.operator.service"
import UpdateOperator from "./update.operator.service"
class OperatorService {
    constructor(
        private operatorGet: GetOperator,
        private operatorCreate: CreateOperator,
        private operatorUpdate: UpdateOperator
    ) { }

    getOperators = async (companyId: string) => {
        return this.operatorGet.execute(companyId)
    }

    createOperator = async (companyId: string, data: CreateOperatorType) => {
        return this.operatorCreate.execute(companyId, data)
    }

    updateOperator = async (companyId: string, data: UpdateOperatorType, id: string) => {
        return this.operatorUpdate.execute(companyId, data, id)
    }
}
export default OperatorService