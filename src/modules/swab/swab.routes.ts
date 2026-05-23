import { Router } from "express";
import authenticateMiddleware from "../../shared/http/middlewares/authenticateMiddleware";
import authorizeRoles from "../../shared/http/middlewares/authorizeRoles";
import validateData from "../../shared/http/middlewares/validateData";
import { asyncHandler } from "../../shared/http/asyncHandler";
import { UserRole } from "../user/domain/role.enum";
import SwabController from "./controller/swab.controller";
import SwabService from "./service/swab.service";
import SwabRepository from "./repository/swab.repository";
import TankRepository from "./repository/tank.repository";
import OperatorRepository from "./repository/operator.repository";
import SwabSequenceRepository from "./repository/swab-sequence.repository";
import { createSwabSchema } from "./dto/schemas/create.swab.schema";
import { updateSwabSchema } from "./dto/schemas/update.swab.schema";
import { cancelSwabSchema } from "./dto/schemas/update.status.swab.schema";
import { swabIdParamsSchema } from "./dto/schemas/swab.params.schema";
import { filterSwabsQuerySchema } from "./dto/schemas/filter.swabs.query.schema";
import CreateSwab from "./service/create.swab.service";
import UpdateSwab from "./service/update.swab.service";
import CancelSwab from "./service/status.swab.service";
import FilterSwab from "./service/filter.swab.service";
import SwabFilterRepository from "./repository/filter.swab.repository";

const swabRoutes = Router()

/* repositories */
const swabRepository = new SwabRepository()
const tankRepository = new TankRepository()
const operatorRepository = new OperatorRepository()
const swabSequenceRepository = new SwabSequenceRepository()
const swabFilterRepository = new SwabFilterRepository()

/* services */
const createSwab = new CreateSwab(
    swabRepository,
    tankRepository,
    swabSequenceRepository
)

const updateSwab = new UpdateSwab(
    swabRepository,
    operatorRepository
)

const cancelSwab = new CancelSwab(
    swabRepository
)

const filterSwab = new FilterSwab(
    swabFilterRepository
)

const swabService = new SwabService(
    createSwab,
    updateSwab,
    cancelSwab,
    filterSwab
)

/* controller */
const swabController = new SwabController(swabService)

/* routes */
swabRoutes.post('/',
    authenticateMiddleware,
    validateData(createSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.create)
)

swabRoutes.patch('/:id/check',
    authenticateMiddleware,
    validateData(swabIdParamsSchema, 'params'),
    validateData(updateSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.update)
)

swabRoutes.patch('/:id/status',
    authenticateMiddleware,
    validateData(swabIdParamsSchema, 'params'),
    validateData(cancelSwabSchema, 'body'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.cancelSwab)
)

swabRoutes.get('/',
    authenticateMiddleware,
    validateData(filterSwabsQuerySchema, 'query'),
    authorizeRoles(UserRole.ADMIN, UserRole.OWNER, UserRole.LAB),
    asyncHandler(swabController.filterSwabs)
)

export default swabRoutes