import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"
import { Tank } from "../../../shared/database/entities/Tank"
import { SwabCheckType } from "../../SwabCheck/domain/swabCheck.enum"
import { verifyFaucetCode } from "../../SwabCheck/domain/verifyFaucetCode"
import { verifyNextSwab } from "../../SwabCheck/domain/verifyNextSwab"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import { CreateResponses } from "../dto/types/createResponse"
import { PendingSwab } from "../dto/types/penddingSwabs"
import { SwabHistoryByTank } from "../dto/types/swabHistoryByTank"
import { SwabsResponses } from "../dto/types/swabsResponses"
import { validateTanks } from "../dto/types/validateTanks"
import SwabRepository from "../repository/swab.respository"


class CreateSwab {
    constructor(private swabRepository: SwabRepository) { }

    async execute(data: CreateSwabType, payload: MyJwtPayload): Promise<CreateResponses> {
        //Método para validação do tanks retorna tanks invalidos também
        const validTanks: validateTanks = await this.validateTanks(data, payload)

        if (!validTanks.validTanks.length) {
            return {
                invalidTanks: validTanks.invalidTanks,
                pending: [],
                swabs: []
            }
        }

        //Busca os 3 ultimos swabs realizados e retorna tanto o swab quanto seu relacionamento com swabCheck retorno ex: c2:[swab{},swab{}]
        const historySwabs: SwabHistoryByTank = await this.historySwabs(validTanks, payload)

        //Buscar a torneira do tank
        const faucetCode = verifyFaucetCode(historySwabs)

        // Decidi próximo tipo VISUAL ou ATP regra de negocio e separa swabs que estão em estado pendentes
        const nextSwab = verifyNextSwab(historySwabs)

        if (!nextSwab.result.length) {
            return {
                invalidTanks: validTanks.invalidTanks,
                pending: nextSwab.pending,
                swabs: []
            }
        }
        //Cria o swab contento info definidas como swabs validos dentro de um array[]
        //Defini 
        return await this.createSwab(validTanks, nextSwab.result, nextSwab.pending, faucetCode)
    }


    private async createSwab(tanksValid: validateTanks, infoSwab: Record<string, SwabCheckType>, peddingSwabs: PendingSwab[], faucetCode: Record<string, string>): Promise<CreateResponses> {
        const swabsCreated = []
        for (const tank of tanksValid.validTanks) {

            //pegando os swabs validos e verificando se eles tem o result pendding, a função validTanks valida apenas se os tanks existem 
            const swabsPendings = peddingSwabs.map(s => s.tank)
            if (swabsPendings.includes(tank.name)) {
                continue
            }
            //para criar um novo swab preciso saber basicamente de 2 coisas o tank e o tipo de swab que sera feito
            const swabType = infoSwab[tank.name]
            const swab = await this.swabRepository.create(
                tank,
                swabType
            )
            swabsCreated.push(swab)
        }

        const swabsResponses: SwabsResponses[] = swabsCreated.map(swab =>
        ({
            id: swab.id,
            tank: {
                id: swab.tank.id,
                name: swab.tank.name
            },
            lastFaucet: faucetCode[swab.tank.name],
            check: {
                id: swab.check.id,
                type: swab.check.type,
                result: swab.check.result
            },
            createdAt: swab.createdAt,
            updatedAt: swab.updatedAt
        }))

        return {
            invalidTanks: tanksValid.invalidTanks,
            pending: peddingSwabs,
            swabs: swabsResponses
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