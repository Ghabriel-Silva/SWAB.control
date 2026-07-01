import GetOperator from "./get.operator.service"
class OperatorService {
    constructor(
        private operatorGet: GetOperator
    ) {}

    getUser = async (companyId: string) => {
        return this.operatorGet.execute(companyId)
    }

}


export default OperatorService