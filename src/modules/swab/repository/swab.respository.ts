import { Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";
import { CreateSwabType } from "../dto/schemas/create.swab.schema";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Tank } from "../../../shared/database/entities/Tank";


class SwabRepository {
    private swabRepository: Repository<Swab>
    private tankRepository: Repository<Tank>

    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
        this.tankRepository = AppDataSource.getRepository(Tank)
    }

    create = async (data: CreateSwabType, payloud: MyJwtPayload) => {

    }

    existTank = async (tank:string, payloud: MyJwtPayload) => {
        return await this.tankRepository.findOne({
            where: {
                name: tank,
            },
          
        })
    }
}

export default SwabRepository