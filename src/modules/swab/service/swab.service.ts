import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { CreateSwabType } from "../dto/schemas/create.swab.schema"
import CreateSwab from "./create.swab.service"


class SwabService {
 constructor( private  swabCreate: CreateSwab){}

    async create(data:CreateSwabType, payloud:MyJwtPayload){
        return await this.swabCreate.execute(data, payloud)
    }
}

export default SwabService