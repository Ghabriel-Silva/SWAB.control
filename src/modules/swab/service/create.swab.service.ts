import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"
import { generateInternalCode } from "../domain/generateInternalCode"
import { prefixInternalCode } from "../domain/prefixInternalCode"
import { SwabCheckType } from "../domain/swabCheck.enum"
import { verifyNextSwab } from "../domain/verifyNextSwab"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import { CreateResponses } from "../dto/types/create/createResponse"
import { PendingSwab } from "../dto/types/create/penddingSwabs"
import { SwabHistoryByLocation } from "../dto/types/create/swabHistoryByTank"
import { SwabsResponses } from "../dto/types/create/swabsResponses"
import { validateLocation } from "../dto/types/create/validateLocation"
import SwabRepository from "../repository/swab.repository"
import SwabSequenceRepository from "../repository/swab-sequence.repository"
import LocationRepository from "../repository/tank.repository"

class CreateSwab {
    constructor(
        private swabRepository: SwabRepository,
        private locationRepository: LocationRepository,
        private swabSequenceRepository: SwabSequenceRepository
    ) { }

    async execute(data: CreateSwabType, payload: MyJwtPayload): Promise<CreateResponses> {

        const validateLocation = await this.validateExistingLocation(data, payload)
        if (!validateLocation.validLocations.length) {
            return {
                invalidLocation: validateLocation.invalidLocation,
                pending: [],
                swabsCreate: []
            }
        }

        const swabHistory: SwabHistoryByLocation = await this.getSwabHistory(validateLocation, payload)
        const nextSwab = verifyNextSwab(swabHistory)

        return await this.createSwabs(
            validateLocation,
            nextSwab.result,
            nextSwab.pending,
            payload,
            swabHistory
        )
    }

    private async createSwabs(validateLocation: validateLocation, swabTypes: Record<string, SwabCheckType>, pendingSwabs: PendingSwab[], payload: MyJwtPayload, swabHistory: SwabHistoryByLocation): Promise<CreateResponses> {

        const createdSwabs = []

        const prefix = prefixInternalCode()

        const pendingLocationNames = new Set(
            pendingSwabs.map(swab => swab.location)
        )

        for (const location of validateLocation.validLocations) {

            if (pendingLocationNames.has(location.name)) {
                continue
            }

            const swabType = swabTypes[location.name]

            const swabsOfLocation: Swab[] = swabHistory[location.name]

            const lastFaucet: string = swabsOfLocation.length ?
                swabsOfLocation[0].faucetCode : 'N/D' //Caso não exista historico no tank defino a ultima torneira como NOT DEFINED

            const nextSequence: number = await this.swabSequenceRepository.nextSequence(payload.companyId, prefix)

            const internalCode: string = generateInternalCode(nextSequence)

            const swab = await this.swabRepository.create(
                location.id,
                swabType,
                payload.companyId,
                internalCode,
                lastFaucet
            )
            createdSwabs.push({
                swab,
                tankLocation: location.name
            })

        }

        const createdSwabResponses: SwabsResponses[] =
            createdSwabs.map(item => ({
                swabId: item.swab.id,
                internalCodeSwab: item.swab.internalCode,
                locationName: item.tankLocation,
                typeAtp: item.swab.check.type
            }))

        return {
            invalidLocation: validateLocation.invalidLocation,
            pending: pendingSwabs,
            swabsCreate: createdSwabResponses
        }
    }

    private async validateExistingLocation(data: CreateSwabType, payload: MyJwtPayload): Promise<validateLocation> {
        const foundLocation = await this.locationRepository.exists(
            data.location.map(i => i.toUpperCase()),
            payload.companyId
        )

        const foundNames = foundLocation.map(location => location.name)

        const invalidLocation = data.location.filter(
            name => !!name && !foundNames.includes(name)
        )

        return {
            validLocations: foundLocation,
            invalidLocation
        }
    }

    private async getSwabHistory(validateLocation: validateLocation, payload: MyJwtPayload): Promise<SwabHistoryByLocation> {

        const entries = await Promise.all(
            validateLocation.validLocations.map(async (location) => {

                const swabs = await this.swabRepository.history(
                    location.id,
                    payload.companyId,
                    location.atpFrequency
                )

                return [location.name, swabs] as [string, Swab[]]
            })
        )

        return Object.fromEntries(entries)
    }
}



export default CreateSwab