import { Repository } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import { AppDataSource } from "../../../shared/database/data-source"
import { OperatorPosition } from "../../../shared/database/entities/OperatorPosition"


class OperatorRepository {
    private operatorRepository: Repository<Operator>
    private possitionRepository: Repository<OperatorPosition>
    constructor() {
        this.operatorRepository = AppDataSource.getRepository(Operator)
        this.possitionRepository = AppDataSource.getRepository(OperatorPosition)
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

    existPosition = async (companyId: string, positionId: string): Promise<boolean> => {
        return await this.possitionRepository.exists({
            where: {
                company: {
                    id: companyId
                },
                id: positionId
            }
        })
    }

    createOperator = async (companyId: string, positionId: string) => {
        //valida possition se existe 


        //validade se laboratorio existe


        //cria operador 
    }

}

export default OperatorRepository