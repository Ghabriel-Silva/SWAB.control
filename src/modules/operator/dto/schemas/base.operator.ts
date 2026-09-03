import * as yup from "yup"

export const BaseOperatorSchema = yup.object({
    name: yup
        .string()
        .max(50, 'O nome deve conter no maximo 50 caracteres')
        .min(5, "O nome deve conter no minimo 5 caracteres"),

    position: yup
        .string()
        .uuid('ID inválido'),

    laboratory: yup
        .string()
        .uuid('ID inválido')
})