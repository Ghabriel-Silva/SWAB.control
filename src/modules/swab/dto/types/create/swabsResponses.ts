import { SwabCheckType } from "../../../../SwabCheck/domain/swabCheck.enum"
import { SwabCheckResult } from "../../../../SwabCheck/domain/swabResult.enum"

export interface SwabsResponses {
    id: string,
    tank: {
        id: string,
        name: string
    },
    lastFaucet: string,
    check: {
        id: string
        type: SwabCheckType
        result: SwabCheckResult
    },
    createdAt: Date
    updatedAt: Date
}