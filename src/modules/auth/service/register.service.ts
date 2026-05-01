import { CreateUserType } from "../dto/schemas/create-user.schema"
import bcrypt from "bcrypt";
import AuthRepository from "../repositories/auth.repository";
import AppError from "../../../shared/errors/AppError";
import { authMessages } from "../constants/auth.messages";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { UserRole } from "../../user/domain/role.enum";
import { userSafe } from "../dto/types/userSafe";

class RegisterService {
    constructor(
        private authRepository: AuthRepository,
        private readonly saltRounds = Number(process.env.BCRYPT_SALT)

    ) { }
    async execute(data: CreateUserType, payload: MyJwtPayload) {
        //Se vou criar um user Lab e n tive o id do lab a qual pertence dara erro
        if (data.role === UserRole.LAB && !data.laboratoryId) {
            throw new AppError(400, authMessages.register.roleIsLab)
        }
        //Admin não pode criar Outro aDmin apenas user
        if (payload.role === UserRole.ADMIN && data.role === UserRole.ADMIN) {
            throw new AppError(400, authMessages.register.adminNotPermition)
        }
        //Valida se o email já exite 
        const emailIsValid = await this.authRepository.emailExist(data.email)

        if (emailIsValid) {
            throw new AppError(409, authMessages.register.emailAlreadyExists)
        }

        //Valida se o hash da senha esta valido
        if (!this.saltRounds) {
            throw new Error("BCRYPT_SALT inválido")
        }
        const hash = await bcrypt.hash(data.password, this.saltRounds)

        const result: userSafe = await this.authRepository.register({
            ...data,
            password: hash
        }, payload)

        if (!result) {
            throw new AppError(400, authMessages.register.error)
        }
        return result
    }
}

export default RegisterService