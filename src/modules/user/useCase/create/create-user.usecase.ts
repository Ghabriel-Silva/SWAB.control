import UserRepository from "../../repository/user.repository"

class CreateUserUseCase {
    constructor(private userRepository:UserRepository){}
    
    register = async () => {
        return this.userRepository.register()
    }
}

export default CreateUserUseCase