import { Repository } from "typeorm";
import { User } from "../../../shared/database/entities/User";
import { AppDataSource } from "../../../shared/database/data-source";
import { CreateUserType } from "../dto/schemas/create-user.schema";
import { UserRole } from "../domain/role.enum";

class UserRepository {
    private userRepository:Repository<User>

    constructor(){
        this.userRepository = AppDataSource.getRepository(User)
    }

    register = async (data:CreateUserType) => {
        const userData = this.userRepository.create({
            email:data.email, 
            name:data.name, 
            password:data.password, 
            role:UserRole[data.role], 
        })
        return this.userRepository.save(userData)
    }
}

export default UserRepository