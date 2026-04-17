import { Repository } from "typeorm";
import { User } from "../../../shared/database/entities/User";
import { AppDataSource } from "../../../shared/database/data-source";

class UserRepository {
    private userRepository:Repository<User>

    constructor(){
        this.userRepository = AppDataSource.getRepository(User)
    }

    register = async () => {
        return this.userRepository.find()
    }
}

export default UserRepository