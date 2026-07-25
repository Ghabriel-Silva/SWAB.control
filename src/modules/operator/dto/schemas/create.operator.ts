import * as yup from "yup"

export const CreateOperatorSchema = yup.object({
    name: yup
        .string()
        .max(50, 'O nome deve conter no maximo 50 caracteres')
        .min(5, "O nome deve conter no minimo 5 caracteres")
        .required(),

    position: yup
        .string()
        .uuid('ID inválido')
        .required(),

    laboratory: yup
        .string()
        .uuid('ID inválido')
        .required()
})

export type CreateOperatorType = yup.InferType<typeof CreateOperatorSchema>