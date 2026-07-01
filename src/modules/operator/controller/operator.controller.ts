import { Request, Response } from "express";
import OperatorService from "../service/operator.service";
import { successResponse } from "../../../shared/responses/success";
import { Operator } from "../../../shared/database/entities/Operator";

class OperatorController {
    constructor(private operatorServicer: OperatorService) { }

    getOperator = async (req: Request, res: Response) => {
        const companyId = req.user?.companyId as string

        const resp: Operator[] = await this.operatorServicer.getUser(companyId)

        res.json(
            successResponse(
                resp,
                'Operadores encontrados com sucesso',
                null,
            )
        )

    }
}

export default OperatorController