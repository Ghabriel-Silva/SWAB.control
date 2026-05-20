import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"
import { generateInternalCode } from "../domain/generateInternalCode"
import { prefixInternalCode } from "../domain/prefixInternalCode"
import { SwabCheckType } from "../domain/swabCheck.enum"
import { verifyNextSwab } from "../domain/verifyNextSwab"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import { CreateResponses } from "../dto/types/create/createResponse"
import { PendingSwab } from "../dto/types/create/penddingSwabs"
import { SwabHistoryByTank } from "../dto/types/create/swabHistoryByTank"
import { SwabsResponses } from "../dto/types/create/swabsResponses"
import { validateTanks } from "../dto/types/create/validateTanks"
import SwabCreateRepository from "../repository/create.swab.respository"

class CreateSwab {
    constructor(
        private swabRepository: SwabCreateRepository
    ) { }

    async execute(
        data: CreateSwabType,
        payload: MyJwtPayload
    ): Promise<CreateResponses> {

        const validatedTanks = await this.validateExistingTanks(data, payload)

        if (!validatedTanks.validTanks.length) {
            return {
                invalidTanks: validatedTanks.invalidTanks,
                pending: [],
                swabsCreate: []
            }
        }

        const swabHistory = await this.getSwabHistory(validatedTanks, payload)

        const nextSwab = verifyNextSwab(swabHistory)

        return await this.createSwabs(
            validatedTanks,
            nextSwab.result,
            nextSwab.pending,
            payload
        )
    }

    private async createSwabs(
        validatedTanks: validateTanks,
        swabTypes: Record<string, SwabCheckType>,
        pendingSwabs: PendingSwab[],
        payload: MyJwtPayload
    ): Promise<CreateResponses> {

        const createdSwabs = []

        const prefix = prefixInternalCode()

        const pendingTankNames = new Set(
            pendingSwabs.map(swab => swab.tank)
        )

        for (const tank of validatedTanks.validTanks) {

            if (pendingTankNames.has(tank.name)) {
                continue
            }

            const swabType = swabTypes[tank.name]

            const nextSequence: number = await this.swabRepository.nextSwabSequence(payload.companyId, prefix)

            const internalCode: string = generateInternalCode(nextSequence)

            const swab = await this.swabRepository.create(
                tank,
                swabType,
                payload.companyId,
                internalCode
            )

            createdSwabs.push(swab)
        }

        const createdSwabResponses: SwabsResponses[] =
            createdSwabs.map(swab => ({
                swabId: swab.id,
                internalCodeSwab: swab.internalCode,
                tankName: swab.tank.name,
                typeAtp: swab.check.type
            }))

        return {
            invalidTanks: validatedTanks.invalidTanks,
            pending: pendingSwabs,
            swabsCreate: createdSwabResponses
        }
    }

    private async validateExistingTanks(
        data: CreateSwabType,
        payload: MyJwtPayload
    ): Promise<validateTanks> {

        const foundTanks = await this.swabRepository.existTank(data.tank.map(i => i.toUpperCase()), payload)
        const foundNames = foundTanks.map(tank => tank.name)

        const invalidTanks = data.tank.filter(name => !!name && !foundNames.includes(name))

        return {
            validTanks: foundTanks,
            invalidTanks
        }
    }

    private async getSwabHistory(validatedTanks: validateTanks, payload: MyJwtPayload): Promise<SwabHistoryByTank> {
        const entries = await Promise.all(
            validatedTanks.validTanks.map(async (tank) => {

                const swabs = await this.swabRepository.historySwab(tank.id, payload, tank.atpFrequency)

                return [tank.name, swabs] as [string, Swab[]]
            })
        )

        return Object.fromEntries(entries)
    }
}

export default CreateSwab