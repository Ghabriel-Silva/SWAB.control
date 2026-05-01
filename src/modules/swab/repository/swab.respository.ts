import { Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";


class SwabRepository {
    private swabRepository: Repository<Swab>

    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
    }

    create = async () => {

    }
}

export default SwabRepository