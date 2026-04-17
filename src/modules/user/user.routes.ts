import { Router } from "express";
import UserController from "./controller/user.controller";
import { asyncHandler } from "../../shared/http/asyncHandler";
import CreateUserUseCase from "./useCase/create/create-user.usecase";
import UserRepository from "./repository/user.repository";


const userRoutes = Router()

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const userController = new UserController(createUserUseCase)

userRoutes.post('/register', asyncHandler(userController.register))

export default userRoutes