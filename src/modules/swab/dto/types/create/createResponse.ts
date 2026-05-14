import { PendingSwab } from "./penddingSwabs";
import { SwabsResponses } from "./swabsResponses";

export interface CreateResponses {
    invalidTanks: string[],
    pending: PendingSwab[],
    swabsCreate: SwabsResponses[]
}