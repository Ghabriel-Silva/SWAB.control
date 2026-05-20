import { Operator } from "../../../../../shared/database/entities/Operator";
import { Swab } from "../../../../../shared/database/entities/Swab";
import { SwabCheck } from "../../../../../shared/database/entities/SwabCheck";
import { UpdateSwabType } from "../../schemas/update.swab.schema";

export const objectUpdate = (data: UpdateSwabType): Partial<Swab> => {
    return {
        faucetCode: data.faucetCode,

        operator: {
            id: data.operatorId
        } as Operator,

        check: {
            type: data.performedType,
            result: data.result,

            ...(data.validatedAt && {
                validatedAt: data.validatedAt
            }),

            ...(data.valueAtp && {
                valueAtp: data.valueAtp
            }),

            ...(data.batch && {
                batch: data.batch
            }),

            ...(data.observation && {
                observation: data.observation
            }),

            ...(data.sameFaucetJustification && {
                sameFaucetJustification: data.sameFaucetJustification
            })

        } as SwabCheck
    }
}