import { Repository } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import { AppDataSource } from "../../../shared/database/data-source"
import { OperatorPosition } from "../../../shared/database/entities/OperatorPosition"
import { Laboratory } from "../../../shared/database/entities/Laboratory"
import { CreateOperatorType } from "../dto/schemas/create.operator"


class OperatorRepository {
    private operatorRepository: Repository<Operator>
    private possitionRepository: Repository<OperatorPosition>
    private laboratoryRepository: Repository<Laboratory>

    constructor() {
        this.operatorRepository = AppDataSource.getRepository(Operator)
        this.possitionRepository = AppDataSource.getRepository(OperatorPosition)
        this.laboratoryRepository = AppDataSource.getRepository(Laboratory)
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

    existeLaboratory = async (companyId: string, laboratoryId: string): Promise<boolean> => {
        return await this.laboratoryRepository.exists({
            where: {
                company: {
                    id: companyId
                },
                id: laboratoryId
            }
        })
    }

    createOperator = async (companyId: string, data: CreateOperatorType): Promise<Operator> => {
        const createOperator = await this.operatorRepository.create({
            company: {
                id: companyId
            },
            laboratory: {
                id: data.laboratory
            },
            position: {
                id: data.position
            },
            name: data.name
        })

        return this.operatorRepository.save(createOperator)
    }

}

export default OperatorRepository