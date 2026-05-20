import * as yup from 'yup'

export const cancelSwabSchema = yup.object({
    cancelReason: yup
        .string()
        .trim()
        .min(10, "A descrição deve ter no minimo 10  caracteres")
        .max(250, "A descrição deve ter no maximo 250 caracteres")
})

export type CancelSwabType = yup.InferType<typeof cancelSwabSchema>