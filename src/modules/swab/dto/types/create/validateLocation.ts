import { Location } from "../../../../../shared/database/entities/Location"

export interface validateLocation {
    validLocations: Location[]
    invalidLocation: string[]
}