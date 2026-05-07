import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import SwabService from "../service/swab.service";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";

class SwabController {
    constructor(private swabService: SwabService){}

    create =  async (req:Request, res:Response)=>{
        const payloud = req.user as MyJwtPayload
        const response = await this.swabService.create(req.body, payloud)
        
        return res.json(
            successResponse(response, 'Swab Criado')
        )
    }
}

export default SwabController