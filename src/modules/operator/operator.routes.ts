import { Router } from "express";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "../user/domain/role.enum";
import { asyncHandler } from "../../shared/http/asyncHandler";
import OperatorController from "./controller/operator.controller";


const operatorRoutes = Router()

operatorRoutes.get('/',
    authenticateMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(OperatorController)
)



export default operatorRoutes