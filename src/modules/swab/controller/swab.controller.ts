import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import SwabService from "../service/swab.service";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { SWAB_MESSAGES } from "../constants/swab.messages";
import { UpdateSwabType } from "../dto/schemas/update.swab.schema";
import { CancelResponse } from "../dto/types/cancel/cancelResponse";

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
                `Swab cancelado com sucesso`
            )
        )
    }
}

export default SwabController