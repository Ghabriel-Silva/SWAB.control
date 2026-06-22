import { Swab } from "../../../shared/database/entities/Swab";
import { SWAB_MESSAGES } from "../constants/swab.messages";
import { PendingSwab } from "../dto/types/create/penddingSwabs";
import { SwabHistoryByLocation } from "../dto/types/create/swabHistoryByTank";
import { SwabCheckType } from "./swabCheck.enum";
import { SwabCheckResult } from "./swabResult.enum";

export function verifyNextSwab(swabs: SwabHistoryByLocation) {
    const result: Record<string, SwabCheckType> = {}  // c2: 'VISUL'
    const pending: PendingSwab[] = []

    for (const [locationName, locationSwab] of Object.entries(swabs)) {

        // localizações  sem histórico iniciam obrigatoriamente com ATP
        if (!locationSwab?.length) {
            result[locationName] = SwabCheckType.ATP
            continue
        }
        const lastSwab = locationSwab[0]


        if (!lastSwab.check) {
            pending.push({
                location: locationName,
                swabId: lastSwab.id,
                message: SWAB_MESSAGES.CREATE.PENDING_CHECK(locationName) //O swab orbigatoriamente precisar ter o check, pois funciona como um historico 
            })
            continue
        }
        const frequencyATP = lastSwab.location.atpFrequency
        const lastResultSwab = lastSwab.check.result
        //Para n deixar depois criar swabs pendentes 
        if (lastResultSwab === SwabCheckResult.PENDING) {
            pending.push({
                location:locationName,
                swabId: lastSwab.id,
                message: SWAB_MESSAGES.CREATE.PENDING_SWAB(locationName)
            })
            continue
        }

        //Se o ultimo swab for reprovado automaticamente o proximo sera atp
        if (lastResultSwab === SwabCheckResult.REPROVED) {
            result[locationName] = SwabCheckType.ATP
            continue
        }

        //Se frequencia atp === 0 proximo swab sera ATP
        // Frequencia definida quando cria o tank default 3 
        if (frequencyATP === 0) {
            result[locationName] = SwabCheckType.ATP
            continue
        }

        //Aqui  tenho o check retornado para cada tank, se em 'N' swabs o resultado é aprovado 
        const requiredSwabs: Swab[] = locationSwab.slice(0, frequencyATP)

        //se todos forem aprovados  e forem visuais retorno true se n false 
        const allAprovet: boolean = requiredSwabs.every(
            s => 
                s.check.result === SwabCheckResult.APPROVED &&
                s.check.type === SwabCheckType.VISUAL
            
        )


        //aqui  no caso se  dentro do array todos terem o resultado aprovados e o tamanho desse array for igual a frequencia defina no tank significa que o proximo swab sera ATP, se n corresponder a essa condição o swab sera visual
        if (allAprovet && requiredSwabs.length === frequencyATP ) {
            result[locationName] = SwabCheckType.ATP
            continue
        }

        result[locationName] = SwabCheckType.VISUAL
    }

    return {
        result,
        pending
    }
}