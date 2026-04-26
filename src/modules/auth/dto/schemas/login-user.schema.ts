import * as yup from "yup"

export const loginUserSchema = yup.object({
    email: yup.string().email('O email deve ser um email valido').required("Email é obrigatório"),
    password: yup.string().min(6, 'A senha deve ter mais de 6 digitos').required("Senha é obrigatória"),
})
export type LoginUserType = yup.InferType<typeof loginUserSchema>