import { Operator } from "../../../shared/database/entities/Operator";
import AppError from "../../../shared/errors/AppError";
import { OPERATOR_MESSAGES } from "../constants.ts/operator.messages";
import { CreateOperatorType } from "../dto/schemas/create.operator";
import OperatorRepository from "../repository/operator.repository";


export class CreateOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = async (companyId: string, data: CreateOperatorType): Promise<Operator> => {

        await this.existePosition(companyId, data.position)
        await this.existeLaboratory(companyId, data.laboratory)

        //valida se o nome ja existe um nome igual 
        await this.existeName(companyId, data.name)

        //Criar usuario
        const create = await this.operatorRepository.createOperator(companyId, data)

        if (!create) {
            throw new AppError(
                404,
                OPERATOR_MESSAGES.CREATE.CREATE_ERROR
            )
        }

        return create
    }

    existePosition = async (companyId: string, positionId: string): Promise<void> => {
        const possition = await this.operatorRepository.existPosition(companyId, positionId)

        if (!possition) {
            throw new AppError(
                404,
                OPERATOR_MESSAGES.CREATE.INVALID_CARGO
            )
        }
    }

    existeLaboratory = async (companyId: string, laboratoryId: string): Promise<void> => {
        const laboratory = await this.operatorRepository.existeLaboratory(companyId, laboratoryId)

        if (!laboratory) {
            throw new AppError(
                404,
                OPERATOR_MESSAGES.CREATE.INVALID_LABORATORY
            )
        }
    }

    existeName = async (companyId: string, name: string): Promise<void> => {
        const normalizadName: string = name.toUpperCase().trim()
        const nameExist = await this.operatorRepository.existName(companyId, normalizadName)

        if (nameExist) {
            throw new AppError(
                409,
                OPERATOR_MESSAGES.CREATE.NAME_ALREADY_EXISTS(normalizadName)
            )
        }
    }
}