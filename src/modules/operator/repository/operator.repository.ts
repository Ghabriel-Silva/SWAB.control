import { Repository } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import { AppDataSource } from "../../../shared/database/data-source"


class OperatorRepository {
    private operatorRepository: Repository<Operator>
    constructor() {
        this.operatorRepository = AppDataSource.getRepository(Operator)
    }

    getOperator = async () => {

    }

}

export default OperatorRepository