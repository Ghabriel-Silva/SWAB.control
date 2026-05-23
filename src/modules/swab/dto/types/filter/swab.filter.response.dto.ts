export interface SwabResponseDTO {
    id: string

    internalCode: string

    faucetCode: string

    isCancelled: boolean

    cancelledAt: Date | null

    cancelReason: string | null

    createdAt: Date

    updatedAt: Date

    operator?: {
        id: string
        name: string
    }

    tank?: {
        id: string
        name: string
    }

    check?: {
        id: string
        type: string
        result: string
        validatedAt: Date
        valueAtp: number | null
    }
}