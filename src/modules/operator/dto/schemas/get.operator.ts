import * as yup from "yup"
import { BaseOperatorSchema } from "./base.operator"


export const GetOperatorSchema = BaseOperatorSchema.shape({
    name: yup
        .string()
        .optional(),

    position: yup
        .array()
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                return [originalValue]
            }

            return value
        })
        .of(yup.string().uuid('Cargo deve ser valido'))
        .optional(),

    laboratory: yup
        .array()
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                return [originalValue]
            }

            return value
        })
        .of(yup.string().uuid('Setor deve ser valido'))
        .optional(),

    isActive: yup
        .boolean()
        .optional(),
    page: yup
        .number()
        .transform(value => Number(value))
        .typeError('page deve ser um número')
        .min(1, 'page deve ser maior que 0')
        .optional(),

    limit: yup
        .number()
        .transform(value => Number(value))
        .typeError('limit deve ser um número')
        .min(1, 'limit deve ser maior que 0')
        .max(100, 'limit deve ser no máximo 100')
        .optional(),
})

export type GetOperatorType = yup.InferType<typeof GetOperatorSchema>