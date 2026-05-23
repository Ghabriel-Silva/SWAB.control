import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/database/data-source";
import { Operator } from "../../../shared/database/entities/Operator";

class OperatorRepository {
    private operatorRepository: Repository<Operator>

    constructor() {
        this.operatorRepository = AppDataSource.getRepository(Operator)
    }

    findById = async (
        operatorId: string,
        companyId: string
    ): Promise<Operator | null> => {

        return await this.operatorRepository.findOne({
            where: {
                id: operatorId,
                company: {
                    id: companyId
                }
            }
        })
    }
}

export default OperatorRepository