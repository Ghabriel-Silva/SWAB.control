export interface SwabResponseDTO {
    id: string

    internalCode: string

    faucetCode: string

    lastFaucetLocation: string | null

    isCancelled: boolean

    cancelledAt: Date | null

    cancelReason: string | null

    batch: string | null

    createdAt: Date

    updatedAt: Date

    operator?: {
        id: string
        name: string
    }

    location?: {
        id: string
        name: string
    }

    check?: {
        id: string
        type: string
        lastType: string
        result: string
        validatedAt: Date
        valueAtp: number | null
        sameFaucetJustification: string | null
        updateSwabJustification: string | null
        observation: string | null
        justificationLastReprovation: string | null
    }
}