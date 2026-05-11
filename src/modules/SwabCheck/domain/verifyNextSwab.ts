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

        const lastResultSwab = lastSwab.check.result

        //Para n deixar depois criar swabs pendentes 
        if (lastResultSwab === SwabCheckResult.PENDING) {
            pedding.push({
                tank: tankName,
                message: `O tank ${tankName} tem um swab pendente`
            })
            continue
        }


        if (lastResultSwab === SwabCheckResult.REPROVED) {
            result[tankName] = SwabCheckType.ATP
            continue
        }

        const lastThree: Swab[] = tankSwab.slice(0, 3)

        const allAprovet: boolean = lastThree.every(
            s => s.check.result === SwabCheckResult.APPROVED
        )

        if (allAprovet && lastThree.length === 3) {
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