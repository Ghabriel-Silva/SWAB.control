import { Router } from "express";
import UserRepository from "./repository/user.repository";

const userRoutes = Router()

const userRepository = new UserRepository()

export default userRoutes