import { PendingSwab } from "./penddingSwabs";
import { SwabsResponses } from "./swabsResponses";

export interface CreateResponses {
    invalidTanks: string[],
    pedding:PendingSwab[],
    swabs: SwabsResponses[]
}