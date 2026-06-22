import { PendingSwab } from "./penddingSwabs";
import { SwabsResponses } from "./swabsResponses";

export interface CreateResponses {
    invalidLocation: string[],
    pending: PendingSwab[],
    swabsCreate: SwabsResponses[]
}