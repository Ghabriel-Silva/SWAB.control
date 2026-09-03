import * as yup from "yup"
import { BaseOperatorSchema } from "./base.operator"


export const UpdateOperatorSchema = BaseOperatorSchema.shape({
    name: yup
        .string()
        .optional(),

    position: yup
        .string()
        .optional(),

    laboratory: yup
        .string()
        .optional(),
})

export type UpdateOperatorType = yup.InferType<typeof UpdateOperatorSchema>