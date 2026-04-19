
import { Router } from "express";
import UserController from "./controller/user.controller";
import { asyncHandler } from "../../shared/http/asyncHandler";
import CreateUserUseCase from "./useCase/create/create-user.usecase";
import UserRepository from "./repository/user.repository";
import validateMiddleware from "../../shared/http/middlewares/validateMiddleware";
import { createUserSchema } from "./dto/schemas/create-user.schema";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "./domain/role.enum";




const userRoutes = Router()

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const userController = new UserController(createUserUseCase)

userRoutes.post('/register',
    authenticateMiddleware,
    authorizeRoles(UserRole.ADMIN),
    validateMiddleware(createUserSchema, 'body'),
    asyncHandler(userController.register)
)

export default userRoutes