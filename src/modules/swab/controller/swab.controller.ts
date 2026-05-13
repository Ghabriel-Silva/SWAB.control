import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import SwabService from "../service/swab.service";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { SWAB_MESSAGES } from "../constants/swab.messages";

class SwabController {
    constructor(private swabService: SwabService) { }

    create = async (req: Request, res: Response) => {
        const payloud = req.user as MyJwtPayload
        const response = await this.swabService.create(req.body, payloud)

        return res.json(
            successResponse(
                response,
                !response.swabs.length
                    ? SWAB_MESSAGES.CREATE.NO_SWABS_CREATED
                    : SWAB_MESSAGES.CREATE.SUCCESS
            )
        )
    }
    update = async (req: Request, res: Response) => {
        return res.json(
            successResponse(null, 'update aqui')
        )
    }
}

export default SwabController