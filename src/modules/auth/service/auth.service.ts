import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { CreateUserType } from "../dto/schemas/create-user.schema";
import { LoginUserType } from "../dto/schemas/login-user.schema";
import LoginService from "./login.service";
import RegisterService from "./register.service";
class AuthService {
    constructor(
        private loginService: LoginService,
        private registerService: RegisterService, 
    ){}
    async login(data: LoginUserType) {
        return this.loginService.execute(data)
    }
    async register(data: CreateUserType, payloud:MyJwtPayload) {
        return this.registerService.execute(data, payloud)
    }
}
export default AuthService