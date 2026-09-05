import { Repository, UpdateResult } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import { AppDataSource } from "../../../shared/database/data-source"
import { OperatorPosition } from "../../../shared/database/entities/OperatorPosition"
import { Laboratory } from "../../../shared/database/entities/Laboratory"
import { CreateOperatorType } from "../dto/schemas/create.operator"
import { UpdateOperatorType } from "../dto/schemas/update.operator"


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
        const createOperator = this.operatorRepository.create({
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

    existName = async (companyId: string, name: string): Promise<Operator | null> => {
        return this.operatorRepository.findOne({
            where: {
                name: name,
                company: {
                    id: companyId
                }
            }
        })
    }

    updateOperator = async (idOperator: string, data: UpdateOperatorType): Promise<UpdateResult> => {
        return await this.operatorRepository.update(
            {
                id: idOperator
            },
            {
                laboratory: {
                    id: data.laboratory
                },
                position: {
                    id: data.position
                },
                isActive: data.isActive,
                name: data.name
            }
        )

    }
}

export default OperatorRepository