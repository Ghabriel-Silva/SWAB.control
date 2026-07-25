import { Request, Response } from "express";
import OperatorService from "../service/operator.service";
import { successResponse } from "../../../shared/responses/success";
import { Operator } from "../../../shared/database/entities/Operator";
import { OPERATOR_MESSAGES } from "../constants.ts/operator.messages";
import { CreateOperatorType } from "../dto/schemas/create.operator";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";

class OperatorController {
    constructor(
        private operatorServicer: OperatorService) { }

    getOperator = async (req: Request, res: Response) => {
        const companyId = req.user?.companyId as string

        const resp: Operator[] = await this.operatorServicer.getOperators(companyId)

        res.json(
            successResponse(
                resp,
                OPERATOR_MESSAGES.GET.OPERATOR_FOUND,
                null,
            )
        )
    }

    createOperator = async (req: Request, res: Response) => {
        const data = req.body as CreateOperatorType
        const companyId = req.user?.companyId as string

        const resp = await this.operatorServicer.createOperator(companyId, data)

        res.json(
            successResponse(
                resp,
                'Operador Criado Com Sucesso',
                null
            )
        )
    }
}

export default OperatorController