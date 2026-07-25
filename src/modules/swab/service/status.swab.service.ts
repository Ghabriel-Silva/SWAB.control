import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Swab } from "../../../shared/database/entities/Swab";
import AppError from "../../../shared/errors/AppError";
import { SWAB_MESSAGES } from "../constants/swab.messages";
import { CancelSwabType } from "../dto/schemas/update.status.swab.schema";
import { CancelResponse } from "../dto/types/cancel/cancelResponse";
import SwabRepository from "../repository/swab.repository";
class CancelSwab {

    constructor(
        private swabRepository: SwabRepository
    ) { }

    execute = async (swabId: string, payload: MyJwtPayload, data: CancelSwabType): Promise<CancelResponse> => {

        console.log(data.cancelReason)
        
        const swabExists: Swab = await this.validateSwabExists(
            swabId,
            payload.companyId
        )

        const swabCancelDTO: Partial<Swab> = {
            cancelledAt: new Date(),
            cancelReason: data.cancelReason,
            isCancelled: true
        }

        await this.cancelSwab(
            swabId,
            payload.companyId,
            swabCancelDTO
        )

        return {
            swabId: swabExists.id,
            swabLote: swabExists.internalCode
        } as CancelResponse
    }

    private validateSwabExists = async (swabId: string, companyId: string): Promise<Swab> => {

        const swabExists = await this.swabRepository.findById(
            swabId,
            companyId
        )

        if (!swabExists) {

            throw new AppError(
                404,
                SWAB_MESSAGES.DELETE.NOT_FOUND_OR_CANCELED
            )
        }

        return swabExists
    }

    private cancelSwab = async (swabId: string, companyId: string, data: Partial<Swab>) => {

        const resultCancel = await this.swabRepository.cancel(
            swabId,
            companyId,
            data
        )

        if (!resultCancel.affected) {

            throw new AppError(
                400,
                SWAB_MESSAGES.DELETE.ERROR_TO_CANCEL
            )
        }

        return resultCancel
    }
}

export default CancelSwab