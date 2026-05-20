import { SwabCheckType } from "../../../domain/swabCheck.enum"

export interface SwabsResponses {
    swabId: string,
    internalCodeSwab: string
    tankName: string
    typeAtp: SwabCheckType
}