import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Operator } from "../../../shared/database/entities/Operator";
import { Swab } from "../../../shared/database/entities/Swab";
import { SwabCheck } from "../../../shared/database/entities/SwabCheck";
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

        const dataToUpdate: Partial<Swab> = {
            ...(data.faucetCode && {
                faucetCode: data.faucetCode
            }),

            ...(data.operatorId && {
                operator: {
                    id: data.operatorId
                } as Operator
            }),

            check: {
                ...(data.performedType && { type: data.performedType }),
                ...(data.result && { result: data.result }),
                ...(data.validatedAt && { validatedAt: data.validatedAt }),
                ...(data.valueAtp && { valueAtp: data.valueAtp }),
                ...(data.batch && { batch: data.batch }),
                ...(data.observation && { observation: data.observation }),
                ...(data.sameFaucetJustification && {
                    sameFaucetJustification: data.sameFaucetJustification
                })
            } as SwabCheck
        }

        const updateSwab = await this.swabUpdateRepository.updateSwab(dataToUpdate, swabId, payload.companyId)

        // if (!updateSwab) {
        //     throw new AppError(
        //         404,
        //         'Não foi possivel atualizar o swab'
        //     )
        // }

        //ver em projetos anteriores como atualiza uzando o type orm 
        //validar com um swab que tem historico se os metos estao funcionando 
        //Criar objeto para mandar para autlizar as infos do swab ja existente  


        return updateSwab
    }
}

export default UpdateSwab