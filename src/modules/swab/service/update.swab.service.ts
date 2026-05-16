import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import AppError from "../../../shared/errors/AppError";
import { UpdateSwabType } from "../dto/schemas/update.swab.schema";
import SwabCreateRepository from "../repository/create.swab.respository";
import SwabUpdateRepository from "../repository/update.swab.respository";

class UpdateSwab {
    constructor(private swabUpdateRepository: SwabUpdateRepository) { }

    execute = async (swabId: string, payload: MyJwtPayload, data: UpdateSwabType) => {
        /**
         * peratorId
         * performedType valido no yup
         *  result  // valido no yup
         * valueAtp //Opcitional apenas para atp e micro  se não null
         *  faucetCode  //valido no yup, é obrigatorio 
         *  batch //Optional apenas para atp e micro
         *  validatedAt //required quando o result for aprovado
         * 
         *   observation //Obrigatorio quando o tank for reprovado 
         */

        //validar se o id do operador existe
        const operatorExiste = await this.swabUpdateRepository.operatorExiste(data.operatorId, payload.companyId)

        if(!operatorExiste){
            throw new AppError(404, 'Operador não encontrado')
        }
        

        return operatorExiste
        //
    }
}

export default UpdateSwab