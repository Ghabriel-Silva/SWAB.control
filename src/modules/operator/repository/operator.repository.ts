import { Repository } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import { AppDataSource } from "../../../shared/database/data-source"


class OperatorRepository {
    private operatorRepository: Repository<Operator>
    constructor() {
        this.operatorRepository = AppDataSource.getRepository(Operator)
    }

    getOperator = async (companyId: string): Promise<Operator[]> => {
        return await this.operatorRepository.find({
            where: {
                company: {
                    id: companyId
                },
                isActive: true
            },
            relations: {
                position: true
            }
        })
    }

}

export default OperatorRepository