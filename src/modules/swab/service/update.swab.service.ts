import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Swab } from "../../../shared/database/entities/Swab";
import AppError from "../../../shared/errors/AppError";
import { objectUpdate } from "../dto/types/update/objectUpdate";
import { UpdateSwabType } from "../dto/schemas/update.swab.schema";
import SwabUpdateRepository from "../repository/update.swab.respository";
import { SwabCheckType } from "../domain/swabCheck.enum";
import { SWAB_MESSAGES } from "../constants/swab.messages";

class UpdateSwab {
    constructor(private swabUpdateRepository: SwabUpdateRepository) { }



    execute = async (swabId: string, payload: MyJwtPayload, data: UpdateSwabType) => {
        //validação se o swab existe se não existir nem continua
        const swabExists = await this.validateSwabExists(swabId, payload)

        this.ValidationUpdateSwabType(swabExists, data)

        await this.validateOperatorExists(payload, data)

        await this.validateFaucetCodeSequence(swabId, payload, data, swabExists.tank.id)

        await this.validateAtpLimit(swabExists, data)

        const updateData: Partial<Swab> = objectUpdate(data)

        return await this.updateSwab(updateData, swabId, payload, swabExists)
    }

    validateSwabExists = async (swabId: string, payload: MyJwtPayload): Promise<Swab> => {
        //validação se o swab existe se não existir nem continua
        const swabExiste = await this.swabUpdateRepository.swabexiste(swabId, payload.companyId)

        if (!swabExiste) {
            throw new AppError(
                400,
                SWAB_MESSAGES.UPDATE.NOT_FOUND
            )
        }
        return swabExiste
    }

    ValidationUpdateSwabType = (swabExists: Swab, data: UpdateSwabType) => {
        const ATP_REQUIRED_TYPES = [
            SwabCheckType.ATP,
            SwabCheckType.MICRO
        ]
        if (data.performedType == null) return


        const validationsBdType = ATP_REQUIRED_TYPES.includes(swabExists.check.type)
        const validationsUserType = data.performedType === SwabCheckType.VISUAL
        const validationUpdateSwab = validationsBdType && validationsUserType && !data.observation?.trim()
        if (validationUpdateSwab) {
            throw new AppError(
                400,
                SWAB_MESSAGES.UPDATE.SAME_FAUCET_JUSTIFICATION
            )
        }
    }

    validateOperatorExists = async (payload: MyJwtPayload, data: UpdateSwabType) => {
        //Validando se operador existe, validação de segurança 
        const operatorExiste = await this.swabUpdateRepository.operatorExiste(data.operatorId, payload.companyId)

        if (!operatorExiste) {
            throw new AppError(
                404,
                SWAB_MESSAGES.UPDATE.OPERATOR_NOT_FOUND
            )
        }
        return
    }

    validateFaucetCodeSequence = async (swabId: string, payload: MyJwtPayload, data: UpdateSwabType, tankId: string) => {
        const lastfaucet = await this.swabUpdateRepository.lastfacet(tankId, payload.companyId, swabId)

        const isSameFaucet: boolean = lastfaucet?.faucetCode?.toUpperCase() === data.faucetCode.toUpperCase()

        if (isSameFaucet && !data.sameFaucetJustification) {
            throw new AppError(
                400,
                SWAB_MESSAGES.UPDATE.SAME_FAUCET_JUSTIFICATION
            )
        }
        return
    }

    validateAtpLimit = async (swabExists: Swab, data: UpdateSwabType) => {
        const atpLimit = swabExists.tank.atpLimit
            ?? swabExists.company.defaultAtpLimit

        if (
            atpLimit != null &&
            data.valueAtp != null &&
            data.valueAtp > atpLimit &&
            !data.observation?.trim()
        ) {
            throw new AppError(
                400,
                SWAB_MESSAGES.UPDATE.ATP_LIMIT_OBSERVATION
            )
        }
        return
    }

    updateSwab = async (dataToUpdate: Partial<Swab>, swabId: string, payload: MyJwtPayload, swabExists: Swab) => {
        const updateSwab: boolean = await this.swabUpdateRepository.updateSwab(dataToUpdate, swabId, payload.companyId)

        if (!updateSwab) {
            throw new AppError(
                404,
                SWAB_MESSAGES.UPDATE.UPDATE_ERROR(swabExists.tank.name)
            )
        }
        return {
            tankName: swabExists.tank.name,
            swabId: swabExists.id,
            internalCode: swabExists.internalCode ? swabExists.internalCode : ""
        }
    }
}

export default UpdateSwab