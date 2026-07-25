import { CreateOperatorType } from "../dto/schemas/create.operator";
import OperatorRepository from "../repository/operator.repository";


export class CreateOperator {
    constructor(private operatorRepository: OperatorRepository) { }

    execute = (companyId: string, data: CreateOperatorType) => {

        return {
            companyId,
            ...data
        }
    }

    existePosition = () => {

    }

    existeLaboratory = {

    }

    //Para criar um operador tenho que primeiro apontar para um Position ou seja dever existir position
    //preciso ter um laboratorio a qual ele fara 

    //validar se a possição que foi envia existe ou esta cadastrada




    //validar se o laboratorio esta cadastrado e se existe 


    //caso os 2 passe ai sim valida



}