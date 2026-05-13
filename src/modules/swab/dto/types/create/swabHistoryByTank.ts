import { Swab } from "../../../../../shared/database/entities/Swab";

export interface SwabHistoryByTank {
    [tank: string]: Swab[]
}