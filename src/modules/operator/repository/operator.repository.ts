import { Repository, UpdateResult } from "typeorm"
import { Operator } from "../../../shared/database/entities/Operator"
import { AppDataSource } from "../../../shared/database/data-source"
import { OperatorPosition } from "../../../shared/database/entities/OperatorPosition"
import { Laboratory } from "../../../shared/database/entities/Laboratory"
import { CreateOperatorType } from "../dto/schemas/create.operator"
import { UpdateOperatorType } from "../dto/schemas/update.operator"
import { GetOperatorType } from "../dto/schemas/get.operator"


class OperatorRepository {
    private operatorRepository: Repository<Operator>
    private possitionRepository: Repository<OperatorPosition>
    private laboratoryRepository: Repository<Laboratory>

    constructor() {
        this.operatorRepository = AppDataSource.getRepository(Operator)
        this.possitionRepository = AppDataSource.getRepository(OperatorPosition)
        this.laboratoryRepository = AppDataSource.getRepository(Laboratory)
    }

    getOperator = async (companyId: string, dataParams: GetOperatorType) => {
        // return await this.operatorRepository.find({
        //     where: {
        //         company: {
        //             id: companyId
        //         },
        //         isActive: true
        //     },
        //     relations: {
        //         position: true
        //     }
        // })

        const query = this.operatorRepository
            .createQueryBuilder('operator')
            .leftJoinAndSelect('operator.laboratory', 'laboratory')
            .leftJoinAndSelect('operator.position', 'position')
            .where('operator.company = :companyId', { companyId: companyId })
            .orderBy('operator.createdAt', 'ASC')
            .skip((dataParams.page! - 1) * dataParams.limit!)
            .take(dataParams.limit)

        if (dataParams.laboratory) {
            query.andWhere('laboratory.id IN (:...laboratoryId)', {
                laboratoryId: dataParams.laboratory
            })
        }
        if (dataParams.position) {
            query.andWhere('position.id IN (:...positionId)', {
                positionId: dataParams.position
            })
        }
        if (dataParams.isActive) {
            query.andWhere('operator.isActive = :isActive', {
                isActive: dataParams.isActive
            })
        }
        if (dataParams.name) {
            query.andWhere('operator.name LIKE :name', {
                name: `%${dataParams.name}%`
            })
        }

        const [operators, total] = await query.getManyAndCount()

        return {
            operators,
            total
        }

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