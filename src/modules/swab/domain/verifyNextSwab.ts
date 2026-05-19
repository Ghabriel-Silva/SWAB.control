import { Swab } from "../../../shared/database/entities/Swab";
import { SWAB_MESSAGES } from "../constants/swab.messages";
import { PendingSwab } from "../dto/types/create/penddingSwabs";
import { SwabHistoryByTank } from "../dto/types/create/swabHistoryByTank";
import { SwabCheckType } from "./swabCheck.enum";
import { SwabCheckResult } from "./swabResult.enum";

export function verifyNextSwab(swabs: SwabHistoryByTank) {
    const result: Record<string, SwabCheckType> = {}  // c2: 'VISUL'
    const pending: PendingSwab[] = []

    for (const [tankName, tankSwab] of Object.entries(swabs)) {

        // Tanques sem histórico iniciam obrigatoriamente com ATP
        if (!tankSwab?.length) {
            result[tankName] = SwabCheckType.ATP
            continue
        }
        const lastSwab = tankSwab[0]


        if (!lastSwab.check) {
            pending.push({
                tank: tankName,
                swabId: lastSwab.id,
                message: SWAB_MESSAGES.CREATE.PENDING_CHECK(tankName) //O swab orbigatoriamente precisar ter o check, pois funciona como um historico 
            })
            continue
        }
        const frequencyATP = lastSwab.tank.atpFrequency
        const lastResultSwab = lastSwab.check.result
        //Para n deixar depois criar swabs pendentes 
        if (lastResultSwab === SwabCheckResult.PENDING) {
            pending.push({
                tank: tankName,
                swabId: lastSwab.id,
                message: SWAB_MESSAGES.CREATE.PENDING_SWAB(tankName)
            })
            continue
        }

        //Se o ultimo swab for reprovado automaticamente o proximo sera atp
        if (lastResultSwab === SwabCheckResult.REPROVED) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        //Se frequencia atp === 0 proximo swab sera ATP
        // Frequencia definida quando cria o tank default 3 
        if (frequencyATP === 0) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        //Aqui  tenho o check retornado para cada tank, se em 'N' swabs o resultado é aprovado 
        const requiredSwabs: Swab[] = tankSwab.slice(0, frequencyATP)

        //se todos forem aprovados  e forem visuais retorno true se n false 
        const allAprovet: boolean = requiredSwabs.every(
            s => 
                s.check.result === SwabCheckResult.APPROVED &&
                s.check.type === SwabCheckType.VISUAL
            
        )


        //aqui  no caso se  dentro do array todos terem o resultado aprovados e o tamanho desse array for igual a frequencia defina no tank significa que o proximo swab sera ATP, se n corresponder a essa condição o swab sera visual
        if (allAprovet && requiredSwabs.length === frequencyATP ) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        result[tankName] = SwabCheckType.VISUAL
    }

    return {
        result,
        pending
    }
}