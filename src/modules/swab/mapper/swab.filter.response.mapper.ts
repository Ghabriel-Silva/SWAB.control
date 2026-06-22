import { Swab } from "../../../shared/database/entities/Swab"
import { SwabResponseDTO } from "../dto/types/filter/swab.filter.response.dto"

export class SwabResponseMapper {

    static toResponse(swab: Swab): SwabResponseDTO {

        return {
            id: swab.id,

            internalCode: swab.internalCode,

            faucetCode: swab.faucetCode,

            isCancelled: swab.isCancelled,

            cancelledAt: swab.cancelledAt,

            cancelReason: swab.cancelReason,

            createdAt: swab.createdAt,

            updatedAt: swab.updatedAt,

            lastFaucetLocation: swab.lastFaucetLocation,

            batch: swab.check.batch,

            operator: swab.operator && {
                id: swab.operator.id,
                name: swab.operator.name
            },

            location: swab.location && {
                id: swab.location.id,
                name: swab.location.name
            },

            check: swab.check && {
                id: swab.check.id,
                type: swab.check.type,
                result: swab.check.result,
                validatedAt: swab.check.validatedAt,
                valueAtp: swab.check.valueAtp
            }
        }
    }

    static toResponseList(swabs: Swab[]): SwabResponseDTO[] {
        return swabs.map(this.toResponse)
    }
}