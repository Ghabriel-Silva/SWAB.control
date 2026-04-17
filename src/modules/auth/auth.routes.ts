import { Router } from "express";
import { asyncHandler } from "../../shared/http/asyncHandler";
import AuthController from "./controller/auth.controller";
import AuthService from "./service/auth.service";

const authRoutes = Router()

const authService = new AuthService()
const authController = new AuthController(authService)

authRoutes.post('/login', asyncHandler(authController.login))

export default authRoutes
