import * as yup from "yup"
import { SwabCheckType } from "../../../SwabCheck/domain/swabCheck.enum"
import { SwabCheckResult } from "../../../SwabCheck/domain/swabResult.enum"

export const updateSwabSchema = yup.object({
    operatorId: yup
        .string()
        .required('É obrigatório informar o operador responsável pela liberação'),

    performedType: yup
        .mixed<SwabCheckType>()
        .oneOf(
            Object.values(SwabCheckType),
            "O tipo de swab deve ser VISUAL, ATP ou MICRO"
        )
        .required('É obrigatório informar o tipo de swab realizado'),

    result: yup
        .mixed<SwabCheckResult>()
        .oneOf(
            Object.values(SwabCheckResult),
            "O resultado do swab deve ser PENDING, APPROVED ou REPROVED"
        )
        .required('É obrigatório informar o resultado do swab'),

    valueAtp: yup
        .number()
        .typeError('O resultado ATP deve ser informado com um valor numérico')
        .integer('O resultado ATP deve ser um número inteiro')
        .transform((_, v) => {
            if (v === '' || v === undefined || v === null) {
                return null
            }
            return Number(v)
        })
        .when('performedType', ([performedType], schema) => {
            if (performedType === SwabCheckType.ATP || performedType === SwabCheckType.MICRO) {
                return schema.required('É obrigatório informar o resultado ATP para swabs ATP e MICRO')
            }
            return schema.nullable()
        }),

    faucetCode: yup
        .string()
        .max(50, 'O código da torneira deve conter no máximo 50 caracteres')
        .required('É obrigatório informar o código da torneira utilizada'),

    batch: yup
        .string()
        .max(20, 'O lote informado deve conter no máximo 20 caracteres')
        .transform((_, v) => {
            if (typeof v !== 'string') {
                return v
            }

            const trimmed = v.trim()

            return trimmed === '' ? null : trimmed
        })
        .when('performedType', ([performedType], schema) => {
            if (performedType === SwabCheckType.ATP || performedType === SwabCheckType.MICRO) {
                return schema.required('É obrigatório informar o lote utilizado na análise ATP')
            }
            return schema.nullable()
        }),

    validatedAt: yup
        .date()
        .typeError('A data informada para realização do swab é inválida')
        .required('É obrigatório informar a data de realização do swab'),

    observation: yup
        .string()
        .max(500, 'O campo observações deve conter no máximo 500 caracteres')
        .notRequired()

})

export type UpdateSwabType = yup.InferType<typeof updateSwabSchema>