import { CreateUserType } from "../../dto/schemas/create-user.schema"
import UserRepository from "../../repository/user.repository"

class CreateUserUseCase {
    constructor(private userRepository:UserRepository){}
    
    register = async (data:CreateUserType) => {
        return this.userRepository.register()
    }
}
export default CreateUserUseCase