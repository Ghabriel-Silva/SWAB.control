import CreateSwab from "./create.swab.service"


class SwabService {
 constructor( private  swabCreate: CreateSwab){}

    async create(){
        return await this.swabCreate
    }
}

export default SwabService