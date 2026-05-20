import * as yup from 'yup'

export const swabIdParamsSchema = yup.object({
    id: yup
        .string()
        .uuid('ID inválido')
        .required('ID obrigatório')
})

export type SwabIdParamsType = yup.InferType<typeof swabIdParamsSchema>