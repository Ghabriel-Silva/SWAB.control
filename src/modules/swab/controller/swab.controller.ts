import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import SwabService from "../service/swab.service";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { SWAB_MESSAGES } from "../constants/swab.messages";
import { UpdateSwabType } from "../dto/schemas/update.swab.schema";
import { CancelResponse } from "../dto/types/cancel/cancelResponse";
import { FilterSwabsQueryType } from "../dto/schemas/filter.swabs.query.schema";
import { Swab } from "../../../shared/database/entities/Swab";


type Params = {
    id: string
}
class SwabController {
    constructor(private swabService: SwabService) { }

    create = async (req: Request, res: Response) => {
        const payloud = req.user as MyJwtPayload
        const response = await this.swabService.create(req.body, payloud)

        return res.json(
            successResponse(
                response,
                !response.swabsCreate.length
                    ? SWAB_MESSAGES.CREATE.NO_SWABS_CREATED
                    : SWAB_MESSAGES.CREATE.SUCCESS
            )
        )
    }
    update = async (req: Request<Params>, res: Response) => {
        const { id } = req.params
        const payload: MyJwtPayload = req.user as MyJwtPayload
        const data: UpdateSwabType = req.body

        const result = await this.swabService.update(id, payload, data)

        return res.json(
            successResponse(
                result,
                SWAB_MESSAGES.UPDATE.SUCCESS(result.internalCode)
            )
        )
    }

    cancelSwab = async (req: Request<Params>, res: Response) => {
        const { id } = req.params
        const payload: MyJwtPayload = req.user as MyJwtPayload
        const data = req.body

        const resul: CancelResponse = await this.swabService.cancelSwab(id, payload, data)
        res.json(
            successResponse(
                resul,
                SWAB_MESSAGES.DELETE.SUCCESS(resul.swabLote)
            )
        )
    }

    filterSwabs = async (req: Request<FilterSwabsQueryType>, res: Response) => {
        const queryList = req.query
        const payload: MyJwtPayload = req.user as MyJwtPayload

        const result = await this.swabService.filterSwabs(payload, queryList)

        console.log(result)

        return res.json(result)
    }
}

export default SwabController