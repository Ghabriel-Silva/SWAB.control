import AppError from "../../../shared/errors/AppError";
import { CreateOperatorType } from "../dto/schemas/create.operator";
import OperatorRepository from "../repository/operator.repository";


export class CreateOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = async (companyId: string, data: CreateOperatorType) => {

        const wasPosition = await this.existePosition(companyId, data.position)

        return {
            companyId,
            ...data
        }
    }

    existePosition = async (companyId: string, positionId: string): Promise<boolean> => {
        const possition = await this.operatorRepository.existPosition(companyId, positionId)

        if (!possition) {
            throw new AppError(
                404,
                `Não foi encontrado nenhum registro para essa possição`
            )
        }
        return possition
    }

    existeLaboratory = {

    }

    //Para criar um operador tenho que primeiro apontar para um Position ou seja dever existir position
    //preciso ter um laboratorio a qual ele fara 

    //validar se a possição que foi envia existe ou esta cadastrada




    //validar se o laboratorio esta cadastrado e se existe 


    //caso os 2 passe ai sim valida



}