import * as yup from "yup"
import { BaseOperatorSchema } from "./base.operator"

export const CreateOperatorSchema = BaseOperatorSchema.shape({
    name: yup
        .string()
        .required('O nome é obrigatório'),

    position: yup
        .string()
        .required('Cargo é obrigatório'),

    laboratory: yup
        .string()
        .required('Laboratório é obrigatório')
})

export type CreateOperatorType = yup.InferType<typeof CreateOperatorSchema>