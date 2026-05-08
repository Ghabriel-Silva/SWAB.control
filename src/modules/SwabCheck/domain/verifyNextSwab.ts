import { Swab } from "../../../shared/database/entities/Swab";
import { SwabHistoryByTank } from "../../swab/dto/types/swabHistoryByTank";
import { SwabCheckType } from "./swabCheck.enum";
import { SwabCheckResult } from "./swabResult.enum";


export function verifyNextSwab(swabs: SwabHistoryByTank) {
    const result: Record<string, string> ={}

    for(const [tankName, tankSwab] of Object.entries(swabs)){
        if(!tankSwab?.length){
            result[tankName] = SwabCheckType.ATP
            continue
        }
        const lastSwab = tankSwab[0]

        const lastResult = lastSwab.check.result

        if(lastResult === SwabCheckResult.REPROVED){
            result[tankName] = SwabCheckType.ATP
            continue
        }

        const lastThree:Swab[] = tankSwab.slice(0,3)

        const allAprovet:boolean = lastThree.every(
            s=>s.check.result === SwabCheckResult.APPROVED
        )

        if(allAprovet && lastThree.length === 3){
            result[tankName] = SwabCheckType.ATP
        }

        result[tankName] = SwabCheckType.VISUAL
    }
    return result
}