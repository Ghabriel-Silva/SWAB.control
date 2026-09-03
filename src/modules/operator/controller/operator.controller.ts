import { Request, Response } from "express";
import OperatorService from "../service/operator.service";
import { successResponse } from "../../../shared/responses/success";
import { Operator } from "../../../shared/database/entities/Operator";
import { OPERATOR_MESSAGES } from "../constants.ts/operator.messages";
import { CreateOperatorType } from "../dto/schemas/create.operator";
import { UpdateOperatorType } from "../dto/schemas/update.operator";
import { Params } from "../../../shared/types/params.type";
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

        const resp: Operator = await this.operatorServicer.createOperator(companyId, data)

        res.json(
            successResponse(
                !!resp,
                OPERATOR_MESSAGES.CREATE.CREATE_SUCCESS(resp.name),
                null
            )
        )
    }

    updateOperator = async (req: Request<Params>, res: Response) => {
        const data = req.body as UpdateOperatorType
        const { id } = req.params
        const companyId = req.user?.companyId as string
        const resp = await this.operatorServicer.updateOperator(companyId, data, id)

        res.json(
            successResponse(
                resp,
                'Operador Atualizado com Sucesso',
                null
            )
        )
    }
}
export default OperatorController
