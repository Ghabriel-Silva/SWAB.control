import { Router } from "express";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import { asyncHandler } from "../../shared/http/asyncHandler";
import SwabController from "./controller/swab.controller";
import SwabService from "./service/swab.service";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import { UserRole } from "../user/domain/role.enum";
import { createSwabSchema } from "./dto/schemas/create.swab.schema";
import validateData from "../../shared/http/middlewares/validateData";
import { updateSwabSchema } from "./dto/schemas/update.swab.schema";
import UpdateSwab from "./service/update.swab.service";
import SwabCreateRepository from "./repository/create.swab.respository";
import SwabUpdateRepository from "./repository/update.swab.respository";
import CreateSwab from "./service/create.swab.service";
import { cancelSwabSchema } from "./dto/schemas/update.status.swab.schema";
import CancelSwab from "./service/status.swab.service";
import { swabIdParamsSchema } from "./dto/schemas/swab.params.schema";
import SwabCancelRepository from "./repository/update.status.swab.repository";

const swabRoutes = Router()
const swabCreateRepository = new SwabCreateRepository()
const swabUpdateRepository = new SwabUpdateRepository()
const swabCancelRepository = new SwabCancelRepository()


const createSwab = new CreateSwab(swabCreateRepository)
const updateSwab = new UpdateSwab(swabUpdateRepository)
const cancelSwab = new CancelSwab(swabCancelRepository, swabUpdateRepository)

const swabService = new SwabService(createSwab, updateSwab, cancelSwab)

const swabController = new SwabController(swabService)

swabRoutes.post('/', //Create swab 
    authenticateMiddleware,
    validateData(createSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.create)
)

swabRoutes.patch('/:id/check', //update swab
    authenticateMiddleware,
    validateData(swabIdParamsSchema, 'params'),
    validateData(updateSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.update)
)

swabRoutes.patch('/:id/status',
    authenticateMiddleware,
    validateData(swabIdParamsSchema, 'params'),
    validateData(cancelSwabSchema, "body"),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.cancelSwab)
)
export default swabRoutes