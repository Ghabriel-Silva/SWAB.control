import { Repository } from "typeorm";
import { User } from "../../../shared/database/entities/User";
import { AppDataSource } from "../../../shared/database/data-source";

class UserRepository {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    getUser = async (companyId: string): Promise<User[]> => {
        return await this.userRepository.find({
            where: {
                company: {
                    id: companyId
                },
                isActive: true
            }
        })
    }

}

export default UserRepository