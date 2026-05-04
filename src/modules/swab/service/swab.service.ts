import CreateSwab from "./create.swab.service"


class SwabService {
 constructor( private  swabCreate: CreateSwab){}

    async create(){
        return await this.swabCreate.execute
    }
}

export default SwabService