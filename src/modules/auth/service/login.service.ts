import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import AppError from "../../../shared/errors/AppError";
import { authMessages } from "../constants/auth.message";
import { LoginUserType } from "../dto/schemas/login-user.schema";
import AuthRepository from "../repositories/auth.repository";
import TokenService from "./token.service";
import bcrypt from "bcrypt";

class LoginService {
    constructor(
        private tokenService: TokenService,
        private authRepository: AuthRepository
    ) { }
    async execute(data: LoginUserType){
        //validar se o user existe
        const user = await this.authRepository.login(data.email)
        if (!user) {
            throw new AppError(404, authMessages.login.error)
        }
        // valida senha 
        const isValidPassword = await bcrypt.compare(
            data.password,
            user.password
        )
        if (!user || !isValidPassword) {
            throw new AppError(401, authMessages.login.invalidCredentials);
        }

        //Validação de usuário ativo e desavp
        if (!user.role) {
            throw new AppError(400, authMessages.login.inactiveAcount)
        }
        //Cria o payloud para gerar o token
        const payloud: MyJwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            companyId: user.company.id
        }

        const token: string = this.tokenService.generateToken(payloud)
        return {
            user: user.name,
            token: token
        }
    }
}
export default LoginService