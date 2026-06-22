import { Swab } from "../../../../../shared/database/entities/Swab";

export interface SwabHistoryByLocation {
    [location: string]: Swab[]
}