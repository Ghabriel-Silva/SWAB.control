import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Swab } from "../../../shared/database/entities/Swab";
import AppError from "../../../shared/errors/AppError";
import { SWAB_MESSAGES } from "../constants/swab.messages";
import { CancelSwabType } from "../dto/schemas/update.status.swab.schema";
import { CancelResponse } from "../dto/types/cancel/cancelResponse";
import SwabCancelRepository from "../repository/update.status.swab.repository";
import SwabUpdateRepository from "../repository/update.swab.respository";

class CancelSwab {
    constructor(
        private cancelSwabRepository: SwabCancelRepository,
        private updateSwabRepository: SwabUpdateRepository
    ) { }

    execute = async (swabId: string, payload: MyJwtPayload, data: CancelSwabType): Promise<CancelResponse> => {

        const swabE: Swab = await this.swabExists(swabId, payload.companyId)

        const swabCancelDTO: Partial<Swab> = {
            cancelledAt: new Date(),
            cancelReason: data.cancelReason,
            isCancelled: true
        }

        const swabCancel = await this.swabCancel(
            swabId,
            payload.companyId,
            swabCancelDTO
        )

        return {
            swabId: swabE.id,
            swabLote: swabE.internalCode
        } as CancelResponse
    }

    private swabExists = async (swabId: string, companyId: string) => {
        const swabExist = await this.updateSwabRepository.swabexiste(swabId, companyId)
        if (!swabExist) {
            throw new AppError(
                404,
                SWAB_MESSAGES.DELETE.NOT_FOUND_OR_CANCELED
            )
        }
        return swabExist
    }

    private swabCancel = async (swabId: string, companyId: string, data: Partial<Swab>) => {
        const resultCancel = await this.cancelSwabRepository.cancelSwab(swabId, companyId, data)
        if (!resultCancel) {
            throw new AppError(
                400,
                SWAB_MESSAGES.DELETE.ERROR_TO_CANCEL
            )
        }
        return resultCancel
    }
}
export default CancelSwab