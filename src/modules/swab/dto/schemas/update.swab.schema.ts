import * as yup from "yup"
import { SwabCheckType } from "../../domain/swabCheck.enum"
import { SwabCheckResult } from "../../domain/swabResult.enum"
import { removeBlankSpace } from "../../../../shared/helpers/removeBlankSpace"

const ATP_REQUIRED_TYPES = [
    SwabCheckType.ATP,
    SwabCheckType.MICRO
]

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
        .required(),

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
        .min(0, 'O valor ATP não pode ser negativo')
        .transform((_, v) => {
            if (v === '' || v === undefined || v === null) {
                return null
            }
            return Number(v)
        })
        .when('performedType', ([performedType], schema) => {
            if (ATP_REQUIRED_TYPES.includes(performedType)) {
                return schema.required(
                    'É obrigatório informar o resultado ATP para swabs ATP e MICRO'
                )
            }

            return schema.nullable()
        }),

    faucetCode: yup
        .string()
        .transform(removeBlankSpace)
        .max(50, 'O código da torneira deve conter no máximo 50 caracteres')
        .required('É obrigatório informar o código da torneira utilizada'),

    batch: yup
        .string()
        .max(20, 'O lote informado deve conter no máximo 20 caracteres')
        .transform(removeBlankSpace)
        .when('performedType', ([performedType], schema) => {
            if (ATP_REQUIRED_TYPES.includes(performedType)) {
                return schema.required('É obrigatório informar o lote utilizado na análise ATP')
            }
            return schema.nullable()
        }),

    validatedAt: yup
        .date()
        .typeError('A data informada para realização do swab é inválida')
        .notRequired()
        .when('result', {
            is: (value: SwabCheckResult) =>
                value === SwabCheckResult.APPROVED
            ,
            then: (schema) =>
                schema.required('É obrigatório informar a data de realização do swab quando o Swab estiver aprovado')
        }),

    observation: yup
        .string()
        .max(500, 'O campo observações deve conter no máximo 500 caracteres')
        .notRequired()
        .transform(removeBlankSpace)
        .when('result', {
            is: (value: SwabCheckResult) =>
                value === SwabCheckResult.REPROVED,
            then: (schema) =>
                schema.required('Oberservação é obrigatório quando o swab for reprovado')
        }),
    sameFaucetJustification: yup
        .string()
        .max(250, 'O maximo de caracteres é 250')
        .transform(removeBlankSpace)
        .nullable()
})

export type UpdateSwabType = yup.InferType<typeof updateSwabSchema>