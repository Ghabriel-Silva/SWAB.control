import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import AppError from "../../../shared/errors/AppError"
import { userMessages } from "../constants/user"
import { UserRole } from "../domain/role.enum"
import { CreateUserType } from "../dto/schemas/create-user.schema"
import UserRepository from "../repository/user.repository"

class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    register = async (data: CreateUserType, payloud: MyJwtPayload) => {
        if (payloud.role === UserRole.OWNER || payloud.role === UserRole.ADMIN) {
            const result = this.userRepository.register(data)

            if (!result) {
                throw new AppError(400, userMessages.create.error)
            }
        }

    }
}
export default CreateUserUseCase