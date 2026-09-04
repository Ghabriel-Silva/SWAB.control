import { Operator } from "../../../shared/database/entities/Operator";
import AppError from "../../../shared/errors/AppError";
import { UpdateOperatorType } from "../dto/schemas/update.operator";
import OperatorRepository from "../repository/operator.repository";



class UpdateOperator {
    constructor(
        private operatorRepository: OperatorRepository
    ) { }

    execute = async (companyId: string, data: UpdateOperatorType, id: string) => {
        //Buscar os dados atuais do operador 
        const operatorData: Operator | null = await this.getOperatorById(id, companyId)

        //Verificar se o nome anterior é ingual ao que esta sendo enviado
        if (operatorData?.name === data.name?.trim()) {
            throw new AppError(
                409,
                'O nome é o mesmo'
            )
        }
        //verificar se o laboratorio existe 
        if (data.laboratory) {
            await this.existLab(companyId, data.laboratory)
        }

        //validar se a possition existe 
        if (data.position) {
            await this.existPosition(companyId, data.position)
        }


        const updateResponse = await this.operatorRepository.updateOperator(operatorData.id, data)


        return operatorData
    }

    getOperatorById = async (operatorId: string, companyId: string) => {
        const operatorData = await this.operatorRepository.findById(operatorId, companyId)

        if (!operatorData) {
            throw new AppError(
                404,
                'Esse operador não existe'
            )
        }

        return operatorData
    }

    existLab = async (companyId: string, laboratoryId: string): Promise<void> => {
        const existLaboratory = await this.operatorRepository.existeLaboratory(companyId, laboratoryId)
        if (!existLaboratory) {
            throw new AppError(
                404,
                'Laboratório não encontrado'
            )
        }
    }

    existPosition = async (companyId: string, positionId: string): Promise<void> => {
        const existPosition = await this.operatorRepository.existPosition(companyId, positionId)
        if (!existPosition) {
            throw new AppError(
                404,
                'Nenhum registro encontrado para cargo'
            )
        }
    }
}

export default UpdateOperator