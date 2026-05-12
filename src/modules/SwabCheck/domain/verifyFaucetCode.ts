import { SwabHistoryByTank } from "../../swab/dto/types/swabHistoryByTank";


export function verifyFaucetCode(historySwabs: SwabHistoryByTank) {
    //Centraliza a torneira do tank 
    const tankTorn: Record<string, string> = {}

    for (const [tank, swabInfo] of Object.entries(historySwabs)) {

        const lastTorn = swabInfo[0]

        if (!lastTorn) {
            tankTorn[tank] = 'Nenhum Swab Encontrado, a torneira não foi definida'
            continue
        }

        if (!lastTorn.faucetCode) {
            tankTorn[tank] = 'A torneira não foi definida'
            continue
        }
        tankTorn[tank] = lastTorn.faucetCode
    }

    return tankTorn
}