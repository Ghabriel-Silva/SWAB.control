import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"
import { Tank } from "../../../shared/database/entities/Tank"
import { SwabCheckType } from "../../SwabCheck/domain/swabCheck.enum"
import { verifyFaucetCode } from "../../SwabCheck/domain/verifyFaucetCode"
import { verifyNextSwab } from "../../SwabCheck/domain/verifyNextSwab"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import { PendingSwab } from "../dto/types/penddingSwabs"
import { SwabHistoryByTank } from "../dto/types/swabHistoryByTank"
import { validateTanks } from "../dto/types/validateTanks"
import SwabRepository from "../repository/swab.respository"


class CreateSwab {
    constructor(private swabRepository: SwabRepository) { }

    async execute(data: CreateSwabType, payload: MyJwtPayload) {
        //Método para validação do tanks retorna tanks invalidos também
        const validTanks: validateTanks = await this.validateTanks(data, payload)

        //Buscar histórico (SwabCheck)
        const historySwabs: SwabHistoryByTank = await this.historySwabs(validTanks, payload)

        //Buscar a torneira do tank
        const faucetCode = verifyFaucetCode(historySwabs)

        // Decidi próximo tipo VISUAL ou ATP regra de negocio e separa swabs que estão em estado pendentes
        const nextSwab = verifyNextSwab(historySwabs)

        console.log(nextSwab.result)

        //Cria o swab contento info definidas como swabs validos dentro de um array[]
        //Defini 
        return await this.createSwab(validTanks, nextSwab.result, nextSwab.pedding)




        //melhorar retorno e tipar retorno importante alem disso retornar para o front apenas o esencial que irei precisar 
    }


    private async createSwab(
        tanksValid: validateTanks,
        typeSwab: Record<string, SwabCheckType>,
        peddingSwabs: PendingSwab[]
    ) {
        const swabsCreated = []

        for (const tankName of tanksValid.validTanks) {

            //pegando os swabs validos e verificando se eles tem o result pendding, a função validTanks valida apenas se os tanks existem 
            const swabsPenddings = peddingSwabs.map(s => s.tank)
            if (swabsPenddings.includes(tankName.name)) {
                continue
            }

            const swabType = typeSwab[tankName.name]
            const swab = await this.swabRepository.create(
                tankName,
                swabType
            )

            swabsCreated.push(swab)
        }

        return {
            invalidTanks: tanksValid.invalidTanks,
            pedding: peddingSwabs,
            swabs: swabsCreated
        }
    }


    private async validateTanks(data: CreateSwabType, payloud: MyJwtPayload): Promise<validateTanks> {
        const invalidTanks: string[] = []
        const validTanks: Tank[] = []


        for (const tanks of data.tank) {
            if (!tanks) continue
            const existTank = await this.swabRepository.existTank(tanks, payloud)

            if (existTank) {
                validTanks.push(existTank)
            } else {
                invalidTanks.push(tanks)
            }
        }
        return {
            validTanks,
            invalidTanks
        }
    }

    private async historySwabs(validTanks: validateTanks, payload: MyJwtPayload): Promise<SwabHistoryByTank> {
        //Buscar histórico (SwabCheck)
        const result: Record<string, Swab[]> = {}

        for (const tank of validTanks.validTanks) {
            const swabs = await this.swabRepository.historySwab(tank.id, payload)

            result[tank.name] = swabs
        }
        return result
    }
}

export default CreateSwab