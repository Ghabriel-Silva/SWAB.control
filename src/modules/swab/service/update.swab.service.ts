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
        //validação se o swab existe se não existir nem continua
        const swabExiste = await this.swabUpdateRepository.swabexiste(swabId, payload.companyId)

        if (!swabExiste) {
            throw new AppError(
                404,
                'Swab não encontrado'
            )
        }

        //Validando se operador existe, validação de segurança 
        const operatorExiste = await this.swabUpdateRepository.operatorExiste(data.operatorId, payload.companyId)

        if (!operatorExiste) {
            throw new AppError(404, 'Operador não encontrado')
        }

        //Validando se a torneira é igual a ultima cadastrada se for obrigatoriamente ter uma justificativa
        const lastfaucet = await this.swabUpdateRepository.lastfacet(swabExiste.tank.id, payload.companyId, swabId)

        const isSameFaucet: boolean = lastfaucet?.faucetCode?.toUpperCase() === data.faucetCode.toUpperCase()

        if (isSameFaucet && !data.sameFaucetJustification) {
            throw new AppError(
                400,
                'Informe uma justificativa para reutilizar a mesma torneira.'
            )
        }

        //validar se o atp que veio esta dentro do valor de atp limit
        const atpLimit = swabExiste.tank.atpLimit
            ?? swabExiste.company.defaultAtpLimit

        if (
            atpLimit != null &&
            data.valueAtp != null &&
            data.valueAtp > atpLimit &&
            !data.observation?.trim()
        ) {
            throw new AppError(
                400,
                'Observação é obrigatória quando o ATP é maior que o limite definido'
            )
        }

        const dataToUpdate: Partial<Swab> = {
            faucetCode: data.faucetCode,
            operator: {
                id: data.operatorId
            } as Operator,
            check: {
                type: data.performedType,
                result: data.result,
                ...(data.validatedAt && { validatedAt: data.validatedAt }),
                ...(data.valueAtp && { valueAtp: data.valueAtp }),
                ...(data.batch && { batch: data.batch }),
                ...(data.observation && { observation: data.observation }),
                ...(data.sameFaucetJustification && {
                    sameFaucetJustification: data.sameFaucetJustification
                })
            } as SwabCheck
        }

        const updateSwab: boolean = await this.swabUpdateRepository.updateSwab(dataToUpdate, swabId, payload.companyId)

        if (!updateSwab) {
            throw new AppError(
                404,
                `Não foi possivel atualizar o swab do tank ${swabExiste.tank.name}`
            )
        }
        //refatorar em funções menores 
        //criar loteInterno no canmpo swab


        return {
            tankName: swabExiste.tank.name,
            swabId: swabExiste.id,
            internalCode: swabExiste.internalCode ? swabExiste.internalCode : ""
        }
    }

    swabExiste = async () => {

    }

    operatorExiste = async () => {

    }

    faucetCodeIsEqualLast = async () => {

    }

    atpLimiteVerification = async () => {

    }

    updateSwab = async () => {

    }
}

export default UpdateSwab