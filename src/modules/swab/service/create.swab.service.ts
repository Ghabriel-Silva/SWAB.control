import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Tank } from "../../../shared/database/entities/Tank"
import AppError from "../../../shared/errors/AppError"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import SwabRepository from "../repository/swab.respository"


class CreateSwab {
    constructor(private swabRepository: SwabRepository) { }

    async execute(data: CreateSwabType, payloud: MyJwtPayload) {
        //Método para validação do tanks retorna tanks invalidos também
        const validTanks = await this.validateTanks(data, payloud)

        
        return validTanks
        //Buscar histórico (SwabCheck)
        //pega últimos checks daquele tanque


        // Decidir próximo tipo VISUAL ou ATP



        // Criar Swab
        // Swab → ligado ao Tank + Operator


        // Criar SwabCheck automático
        // SwabCheck → ligado ao Swab

        // return await this.swabRepository.create(data, payloud)
    }



    private async validateTanks(data: CreateSwabType, payloud: MyJwtPayload) {
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
}

export default CreateSwab