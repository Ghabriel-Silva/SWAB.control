import CreateUser from "./create.user.service";
import GetUser from "./get.user.service";


class UserService {
    constructor(
        private userCreate: CreateUser,
        private userGet: GetUser

    ) { }
    async create() {

    }
    async getUser(companyId: string) {
        return this.userGet.execute(companyId)
    }
}

export default UserService