import { Repository } from "typeorm";
import { Swab } from "../../../shared/database/entities/Swab";
import { AppDataSource } from "../../../shared/database/data-source";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { Operator } from "../../../shared/database/entities/Operator";


class SwabUpdateRepository {
    private swabUpdateRepository: Repository<Swab>
    private operatorRepository: Repository<Operator>

    constructor() {
        this.swabUpdateRepository = AppDataSource.getRepository(Swab)
        this.operatorRepository = AppDataSource.getRepository(Operator)
    }

    updateSwab = async () => {
        
    }

    operatorExiste = async (id: string, companyId: string) => {
        return await this.operatorRepository.findOne({
            where: {
                id,
                company: {
                    id: companyId
                }

            }
        })
    }
}
export default SwabUpdateRepository