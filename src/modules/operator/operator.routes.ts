import { Router } from "express";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "../user/domain/role.enum";
import { asyncHandler } from "../../shared/http/asyncHandler";
import OperatorController from "./controller/operator.controller";
import OperatorService from "./service/operator.service";
import GetOperator from "./service/get.operator.service";
import OperatorRepository from "./repository/operator.repository";


const operatorRoutes = Router()

const operatorRepository = new OperatorRepository()
const operatorGetService = new GetOperator(operatorRepository)
const operatorService = new OperatorService(operatorGetService)
const operatorController = new OperatorController(operatorService)

operatorRoutes.get('/',
    authenticateMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(operatorController.getOperator)
)
export default operatorRoutes