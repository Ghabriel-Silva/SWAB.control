import AppError from "../../../shared/errors/AppError";
import UserRepository from "../repository/user.repository";



class GetUser {
    constructor(private userRepository: UserRepository) { }

    execute = (companyId: string) => {
        const users = this.userRepository.getUser(companyId)
        if (!users) {
            throw new AppError(
                404,
                'Nenhum usuario encontrado'
            )
        }
        return users
    }

}

export default GetUser