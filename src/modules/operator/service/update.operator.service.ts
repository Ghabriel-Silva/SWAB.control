import { UpdateResult } from "typeorm";
import { Operator } from "../../../shared/database/entities/Operator";
import AppError from "../../../shared/errors/AppError";
import { UpdateOperatorType } from "../dto/schemas/update.operator";
import OperatorRepository from "../repository/operator.repository";
import { OPERATOR_MESSAGES } from "../constants.ts/operator.messages";



class UpdateOperator {
    constructor(
        private operatorRepository: OperatorRepository
    ) { }

    execute = async (companyId: string, data: UpdateOperatorType, id: string): Promise<boolean> => {
        //Buscar os dados atuais do operador 
        const operatorData: Operator | null = await this.getOperatorById(id, companyId)

        //valido se o nome é igual ao que tenho no sistema se for passa, se não for valido se o nome consta no sistema
        if (data.name !== undefined && data.name.trim().toLowerCase() !== operatorData.name) {
            const validNameExiste = await this.operatorRepository.existName(
                companyId,
                data.name,
            )

            if (validNameExiste) {
                throw new AppError(
                    409,
                    OPERATOR_MESSAGES.UPDATE.NAME_ALREADY_EXISTS(data.name.trim())
                )
            }
        }


        //verificar se o laboratorio existe 
        if (data.laboratory !== undefined) {
            await this.existLab(companyId, data.laboratory)
        }

        //validar se a possition existe 
        if (data.position !== undefined) {
            await this.existPosition(companyId, data.position)
        }


        await this.operatorRepository.updateOperator(operatorData.id, data)

        return true
    }

    getOperatorById = async (operatorId: string, companyId: string): Promise<Operator> => {
        const operatorData: Operator | null = await this.operatorRepository.findById(operatorId, companyId)

        if (!operatorData) {
            throw new AppError(
                404,
                OPERATOR_MESSAGES.UPDATE.OPERATOR_NOT_FOUND
            )
        }

        return operatorData
    }

    existLab = async (companyId: string, laboratoryId: string): Promise<void> => {
        const existLaboratory = await this.operatorRepository.existeLaboratory(companyId, laboratoryId)
        if (!existLaboratory) {
            throw new AppError(
                404,
                OPERATOR_MESSAGES.UPDATE.INVALID_LABORATORY
            )
        }
    }

    existPosition = async (companyId: string, positionId: string): Promise<void> => {
        const existPosition = await this.operatorRepository.existPosition(companyId, positionId)
        if (!existPosition) {
            throw new AppError(
                404,
                OPERATOR_MESSAGES.UPDATE.INVALID_CARGO
            )
        }
    }
}

export default UpdateOperator