import { Router } from "express";
import { asyncHandler } from "../../shared/http/asyncHandler";
import AuthController from "./controller/auth.controller";
import AuthService from "./service/auth.service";
import LoginService from "./service/login.service";
import TokenService from "./service/token.service";
import RegisterService from "./service/register.service";
import validateData from "../../shared/http/middlewares/validateData";
import { loginUserSchema } from "./dto/schemas/login-user.schema";
import AuthRepository from "./repositories/auth.repository";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import { createUserSchema } from "./dto/schemas/create-user.schema";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "../user/domain/role.enum";

const authRoutes = Router()

const tokenService = new TokenService()
const authRepository = new AuthRepository()

const loginService = new LoginService(tokenService, authRepository) //login tem 2 injeções de dependencias token e o repositorio
const registerService = new RegisterService(authRepository)


const authService = new AuthService(
    loginService,
    registerService,
)
const authController = new AuthController(authService)

authRoutes.post('/login',
    validateData(loginUserSchema, 'body'), //Validar os dados que chegam
    asyncHandler(authController.login) //Controler dentro de função generica evita try/catch
)

authRoutes.post('/register',
    authenticateMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER),
    validateData(createUserSchema, 'body'),
    asyncHandler(authController.register)
)
export default authRoutes
