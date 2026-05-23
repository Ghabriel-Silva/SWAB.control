import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../shared/database/data-source";
import { Tank } from "../../../shared/database/entities/Tank";

class TankRepository {
    private tankRepository: Repository<Tank>

    constructor() {
        this.tankRepository = AppDataSource.getRepository(Tank)
    }

    exists = async (
        tanks: string[],
        companyId: string
    ): Promise<Tank[]> => {

        return await this.tankRepository.find({
            where: {
                name: In(tanks),
                company: {
                    id: companyId
                }
            }
        })
    }

    findById = async (
        tankId: string,
        companyId: string
    ): Promise<Tank | null> => {

        return await this.tankRepository.findOne({
            where: {
                id: tankId,
                company: {
                    id: companyId
                }
            }
        })
    }
}

export default TankRepository