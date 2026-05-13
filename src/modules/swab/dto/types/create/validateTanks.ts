import { Tank } from "../../../../../shared/database/entities/Tank"

export interface validateTanks {
    validTanks: Tank[]
    invalidTanks: string[]
}