
import { Router } from "express";
import UserController from "./controller/user.controller";
import { asyncHandler } from "../../shared/http/asyncHandler";
import UserRepository from "./repository/user.repository";
import validateMiddleware from "../../shared/http/middlewares/validateData";
import { createUserSchema } from "./dto/schemas/create-user.schema";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "./domain/role.enum";
import CreateUserUseCase from "./useCase/create";




const userRoutes = Router()

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const userController = new UserController(createUserUseCase)

userRoutes.post('/register',
    authenticateMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER),
    asyncHandler(userController.register)
)

export default userRoutes