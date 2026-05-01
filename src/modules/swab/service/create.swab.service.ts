import SwabRepository from "../repository/swab.respository"


class CreateSwab {
    constructor(private swabRepository: SwabRepository) {}

    async execute(){
        return await this.swabRepository.create
}
}

export default CreateSwab