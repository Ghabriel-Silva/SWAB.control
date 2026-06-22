import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../shared/database/data-source";
import { Location } from "../../../shared/database/entities/Location";


class LocationRepository {
    private locationRepository: Repository<Location>

    constructor() {
        this.locationRepository = AppDataSource.getRepository(Location)
    }

    exists = async (
        locations: string[],
        companyId: string
    ): Promise<Location[]> => {

        return await this.locationRepository.find({
            where: {
                name: In(locations),
                company: {
                    id: companyId
                }
            }
        })
    }

    findById = async (
        tankId: string,
        companyId: string
    ): Promise<Location | null> => {

        return await this.locationRepository.findOne({
            where: {
                id: tankId,
                company: {
                    id: companyId
                }
            }
        })
    }
}

export default LocationRepository