import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import { UpdateSwabType } from "../dto/schemas/update.swab.schema"
import CreateSwab from "./create.swab.service"
import UpdateSwab from "./update.swab.service"


class SwabService {
    constructor(
        private swabCreate: CreateSwab,
        private swabUpdate:UpdateSwab
    ) {}

    async create(data: CreateSwabType, payloud: MyJwtPayload) {
        return await this.swabCreate.execute(data, payloud)
    }

    async update(swabId: string, payload: MyJwtPayload, data: UpdateSwabType) {
        return await this.swabUpdate.execute(swabId, payload, data)
    }
}

export default SwabService