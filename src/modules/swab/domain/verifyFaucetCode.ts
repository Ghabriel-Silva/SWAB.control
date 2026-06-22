import { SwabHistoryByLocation } from "../dto/types/create/swabHistoryByTank"


export function verifyFaucetCode(historySwabs: SwabHistoryByLocation) {
    //Centraliza a torneira da localização se tiver
    const locationFaucet: Record<string, string> = {}

    for (const [location, swabInfo] of Object.entries(historySwabs)) {

        const lastTorn = swabInfo[0]

        if (!lastTorn) {
            locationFaucet[location] = 'Nenhum Swab Encontrado, a torneira não foi definida'
            continue
        }

        if (!lastTorn.faucetCode) {
            locationFaucet[location] = 'Torneira não definida'
            continue
        }
        locationFaucet[location] = lastTorn.faucetCode
    }

    return locationFaucet
}