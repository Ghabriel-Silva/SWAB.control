import AppError from "../../../shared/errors/AppError";
import { CreateOperatorType } from "../dto/schemas/create.operator";
import OperatorRepository from "../repository/operator.repository";


export class CreateOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = async (companyId: string, data: CreateOperatorType) => {

        await this.existePosition(companyId, data.position)
        await this.existeLaboratory(companyId, data.laboratory)

        //validar se o nome ja existe um nome igual 


        //Criar usuario
        const create = await this.operatorRepository.createOperator(companyId, data)

        if (!create) {
            throw new AppError(
                404,
                'Erro ao criar usuário'
            )
        }

        return !!create
    }

    existePosition = async (companyId: string, positionId: string): Promise<void> => {
        const possition = await this.operatorRepository.existPosition(companyId, positionId)

        if (!possition) {
            throw new AppError(
                404,
                `Cargo invalido, verifique se esse registro existe mesmo`
            )
        }
    }

    existeLaboratory = async (companyId: string, laboratoryId: string): Promise<void> => {
        const laboratory = await this.operatorRepository.existeLaboratory(companyId, laboratoryId)

        if (!laboratory) {
            throw new AppError(
                404,
                `Laborátorio invalido, verifique se esse registro existe mesmo`
            )
        }
    }

    existeName = async (companyId: string, name: string) => {

    }
}