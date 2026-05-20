import { Repository } from "typeorm"
import { Swab } from "../../../shared/database/entities/Swab"
import { AppDataSource } from "../../../shared/database/data-source"

class SwabCancelRepository {
    private swabRepository: Repository<Swab>
    constructor() {
        this.swabRepository = AppDataSource.getRepository(Swab)
    }
    cancelSwab = async (idSwab: string, companyId: string, data: Partial<Swab>) => {
        return await this.swabRepository
            .createQueryBuilder()
            .update(Swab)
            .set(data)
            .where("id = :idSwab", { idSwab })
            .andWhere("companyId = :companyId", { companyId })
            .andWhere("isCancelled = :cancelled", { cancelled: false })
            .execute()
    }
}

export default SwabCancelRepository 