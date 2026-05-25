import { Swab } from "../../../../../shared/database/entities/Swab";

export interface RepositoryResponse {
    swabs: Swab[],
    total: number
}