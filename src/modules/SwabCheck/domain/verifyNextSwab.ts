import { Swab } from "../../../shared/database/entities/Swab";
import { PendingSwab } from "../../swab/dto/types/penddingSwabs";
import { SwabHistoryByTank } from "../../swab/dto/types/swabHistoryByTank";
import { SwabCheckType } from "./swabCheck.enum";
import { SwabCheckResult } from "./swabResult.enum";

export function verifyNextSwab(swabs: SwabHistoryByTank) {
    const result: Record<string, SwabCheckType> = {}  // c2: 'VISUL'
    const pedding: PendingSwab[] = []

    for (const [tankName, tankSwab] of Object.entries(swabs)) {
        if (!tankSwab?.length) {
            result[tankName] = SwabCheckType.ATP
            continue
        }
        const lastSwab = tankSwab[0]

        if (!lastSwab.check) {
            pedding.push({
                tank: tankName,
                message: `O tank ${tankName} possui swab sem check`
            })
            continue
        }
        const frequencyATP = lastSwab.tank.atpFrequency
        const lastResultSwab = lastSwab.check.result
    
        //Para n deixar depois criar swabs pendentes 
        if (lastResultSwab === SwabCheckResult.PENDING) {
            pedding.push({
                tank: tankName,
                message: `O tank ${tankName} possui swab pendente`
            })
            continue
        }

        //Se o ultimo swab for reprovado automaticamente o proximo sera atp
        if (lastResultSwab === SwabCheckResult.REPROVED) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        //se frequencia atp === 0 proximo swab sera Atp
        if (frequencyATP === 0) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        //Aqui pego basicamente a quantidade que preciso que o banco retorna
        const requiredSwabs: Swab[] = tankSwab

        const allAprovet: boolean = requiredSwabs.every(
            s => s.check.result === SwabCheckResult.APPROVED
        )

        if (allAprovet && requiredSwabs.length === frequencyATP) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        result[tankName] = SwabCheckType.VISUAL
    }

    return {
        result,
        pedding
    }
}