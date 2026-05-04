import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import SwabService from "../service/swab.service";

class SwabController {
    constructor(private swabService: SwabService){}

    create =  async (req:Request, res:Response)=>{
        const response = await this.swabService.create
        
        return res.json(
            successResponse(null, 'chegou aui')
        )
    }
}

export default SwabController