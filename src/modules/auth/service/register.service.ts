import { CreateUserType } from "../dto/schemas/create-user.schema"
import bcrypt from "bcrypt";
import AuthRepository from "../repositories/auth.repository";
import AppError from "../../../shared/errors/AppError";
import { authMessages } from "../constants/auth.message";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { UserRole } from "../../user/domain/role.enum";

class RegisterService {
    constructor(private authRepository: AuthRepository) { }
    async execute(data: CreateUserType, payload: MyJwtPayload) {
        //Se vou criar um user e n tive o id do lab a qual pertence dara erro
        if(data.role === UserRole.LAB && !data.laboratoryId){
            throw new AppError(400, authMessages.register.roleIsLab)
        }
        //Valida se o email já exite 
        const emailIsValid = await this.authRepository.emailExist(data.email)

        if (emailIsValid) {
            throw new AppError(409, authMessages.register.emailAlreadyExists)
        }

        //Cria o hash da senha e manda para o repo criar o usuário
        const saltRounds = Number(process.env.BCRYPT_SALT);

        if (!saltRounds) {
            throw new Error("BCRYPT_SALT inválido")
        }
        const hash = await bcrypt.hash(data.password, saltRounds)
        const result = await this.authRepository.register({
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