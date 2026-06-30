import { Router } from "express";
import UserRepository from "./repository/user.repository";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "./domain/role.enum";
import { asyncHandler } from "../../shared/http/asyncHandler";
import UserController from "./controller/user.controller";
import UserService from "./service/user.service";
import CreateUser from "./service/create.user.service";

const userRoutes = Router()

const userRepository = new UserRepository()
const createUser = new CreateUser(userRepository)
const userService = new UserService(createUser)
const userController = new UserController(userService)

userRoutes.get('/',
    authenticateMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(userController.getUser)
)

export default userRoutes