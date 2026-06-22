import { SwabCheckType } from "../../../domain/swabCheck.enum"

export interface SwabsResponses {
    swabId: string,
    internalCodeSwab: string
    locationName: string
    typeAtp: SwabCheckType
}