import { Router } from "express";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import { asyncHandler } from "../../shared/http/asyncHandler";
import SwabController from "./controller/swab.controller";
import SwabService from "./service/swab.service";
import CreateSwab from "./service/create.swab.service";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "../user/domain/role.enum";
import { createSwabSchema } from "./dto/schemas/create.swab.schema";
import validateData from "../../shared/http/middlewares/validateData";
import { updateSwabSchema } from "./dto/schemas/update.swab.schema";
import UpdateSwab from "./service/update.swab.service";
import SwabCreateRepository from "./repository/create.swab.respository";
import SwabUpdateRepository from "./repository/update.swab.respository";

const swabRoutes = Router()
const swabCreateRepository = new SwabCreateRepository()
const swabUpdateRepository = new SwabUpdateRepository()


const createSwab = new CreateSwab(swabCreateRepository)
const updateSwab = new UpdateSwab(swabUpdateRepository)


const swabService = new SwabService(createSwab, updateSwab)

const swabController = new SwabController(swabService)

swabRoutes.post('/', //Create swab 
    authenticateMiddleware,
    validateData(createSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.create)
)

swabRoutes.patch('/:id/check',
    authenticateMiddleware,
    validateData(updateSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.update)
)
export default swabRoutes