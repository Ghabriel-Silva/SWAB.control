import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"
import { Tank } from "../../../shared/database/entities/Tank"
import AppError from "../../../shared/errors/AppError"
import { verifyFaucetCode } from "../../SwabCheck/domain/VerifyFaucetCode"
import { verifyNextSwab } from "../../SwabCheck/domain/verifyNextSwab"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import { SwabHistoryByTank } from "../dto/types/swabHistoryByTank"
import { validateTanks } from "../dto/types/validateTanks"
import SwabRepository from "../repository/swab.respository"


class CreateSwab {
    constructor(private swabRepository: SwabRepository) { }

    async execute(data: CreateSwabType, payload: MyJwtPayload) {
        //Método para validação do tanks retorna tanks invalidos também
        const validTanks: validateTanks = await this.validateTanks(data, payload)

        //Buscar histórico (SwabCheck)
        const historySwabs = await this.historySwabs(validTanks, payload)

        //Buscar a torneira do tank
        const faucetCode = verifyFaucetCode(historySwabs)
        console.log(faucetCode)

        
        // Decidir próximo tipo VISUAL ou ATP regra de negocio 
        const nextSwab =  verifyNextSwab(historySwabs)
        console.log(nextSwab)

        // Criar Swab

        const createSwab = await this.swabRepository.create(data, payload)



        //centralizar dados pra enviar para o frontend



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