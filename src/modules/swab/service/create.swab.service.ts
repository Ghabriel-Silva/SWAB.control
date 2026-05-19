import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"
import { Tank } from "../../../shared/database/entities/Tank"
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
    constructor(private swabRepository: SwabCreateRepository) { }

    async execute(data: CreateSwabType, payload: MyJwtPayload): Promise<CreateResponses> {
        //Método para validação do tanks retorna tanks invalidos também
        const validTanks: validateTanks = await this.validateTanks(data, payload)

        if (!validTanks.validTanks.length) {
            return {
                invalidTanks: validTanks.invalidTanks,
                pending: [],
                swabsCreate: []
            }
        }
        //Busca os 3 ultimos swabs realizados e retorna tanto o swab quanto seu relacionamento com swabCheck retorno ex: c2:[swab{},swab{}]
        const historySwabs: SwabHistoryByTank = await this.historySwabs(validTanks, payload)

        // Decidi próximo tipo VISUAL ou ATP conforme a regra de negócio definida e separa swabs que estão em estado pendentes
        const nextSwab = verifyNextSwab(historySwabs)

        //Cria e retorna o swab contento info definidas como swabs validos pendding e tanks invalidos
        return await this.createSwab(validTanks, nextSwab.result, nextSwab.pending, payload)
    }

    private async createSwab(tanksValid: validateTanks,
        infoSwab: Record<string, SwabCheckType>,
        peddingSwabs: PendingSwab[],
        payload: MyJwtPayload
    ): Promise<CreateResponses> {
        //Para criar um novo swab preciso saber basicamente de 3 coisas 
        //1: Tank que sera realizado o Swab
        //2: Tipo de swab que sera executado
        //3: Lote interno do swab que sera realizado
        const swabsCreated = []
        const prefix = prefixInternalCode()

        for (const tank of tanksValid.validTanks) {
            //Pegando os swabs pendentes barrando a criação deles 
            const swabsPendings = new Set(peddingSwabs.map(s => s.tank))
            if (swabsPendings.has(tank.name)) continue

            const swabType = infoSwab[tank.name]

            const nextSequence = await this.swabRepository.nextSwabSequence(payload.companyId, prefix)

            const internalCode = generateInternalCode(nextSequence)

            const swab = await this.swabRepository.create(
                tank,
                swabType,
                payload.companyId,
                internalCode
            )
            swabsCreated.push(swab)
        }
        //aqui retorno apenas o nome e o id e codigo interno do tank para mensagem de create 
        const swabsResponses: SwabsResponses[] = swabsCreated.map(swab =>
        (
            {
                swabId: swab.id,
                internalCodeSwab: swab.internalCode,
                tankName: swab.tank.name,
            }
        ))

        return {
            invalidTanks: tanksValid.invalidTanks,
            pending: peddingSwabs,
            swabsCreate: swabsResponses
        }
    }

    private async validateTanks(data: CreateSwabType, payloud: MyJwtPayload): Promise<validateTanks> {
        const foundTanks: Tank[] = await this.swabRepository.existTank(
            data.tank.map(i => i.toUpperCase()),
            payloud
        )
        const foundNames: string[] = foundTanks.map(t => t.name)

        const invalidTanks: string[] = data.tank.filter(
            name => !!name && !foundNames.includes(name)
        )
        return {
            validTanks: foundTanks,
            invalidTanks
        }
    }

    private async historySwabs(validTanks: validateTanks, payload: MyJwtPayload): Promise<SwabHistoryByTank> {
        const entries = await Promise.all(
            validTanks.validTanks.map(async (tank) => {
                const swabs = await this.swabRepository.historySwab(tank.id, payload, tank.atpFrequency)
                return [tank.name, swabs] as [string, Swab[]]
            })
        )

        return Object.fromEntries(entries)
    }
}

export default CreateSwab