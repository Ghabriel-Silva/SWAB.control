import * as yup from "yup"

export const createSwabSchema = yup.object({
    tank: yup
        .array()
        .of(
            yup
                .string()
                .transform((value) => value?.toUpperCase())
                .required()
        )
        .required('O tank é obrigatório')
        .min(1, 'Precisa ter pelo menos um item')
        .test(
            "unique",
            "Valores duplicados",
            (value) => {
                if (!value) return true

                return new Set(value).size === value.length
            }
        )
})

export type CreateSwabType = yup.InferType<typeof createSwabSchema>