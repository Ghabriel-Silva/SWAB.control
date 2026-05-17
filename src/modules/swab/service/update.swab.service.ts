import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import AppError from "../../../shared/errors/AppError";
import { UpdateSwabType } from "../dto/schemas/update.swab.schema";
import SwabCreateRepository from "../repository/create.swab.respository";
import SwabUpdateRepository from "../repository/update.swab.respository";

class UpdateSwab {
    constructor(private swabUpdateRepository: SwabUpdateRepository) { }

    execute = async (swabId: string, payload: MyJwtPayload, data: UpdateSwabType) => {
        const swabExiste = await this.swabUpdateRepository.swabexiste(swabId, payload.companyId)

        if (!swabExiste) {
            throw new AppError(
                404,
                'Swab não encontrado'
            )
        }

        const operatorExiste = await this.swabUpdateRepository.operatorExiste(data.operatorId, payload.companyId)

        if (!operatorExiste) {
            throw new AppError(404, 'Operador não encontrado')
        }

        const lastfaucet = await this.swabUpdateRepository.lastfacet(swabExiste.tank.id, payload.companyId, swabId)

        const isSameFaucet: boolean = lastfaucet?.faucetCode?.toUpperCase() === data.faucetCode.toUpperCase()
        

        if (isSameFaucet && !data.sameFaucetJustification) {
            throw new AppError(
                400,
                'Informe uma justificativa para reutilizar a mesma torneira.'
            )
        }
       

        //Criar objeto para mandar para autlizar as infos do swab ja existente 


        return operatorExiste
    }
}

export default UpdateSwab