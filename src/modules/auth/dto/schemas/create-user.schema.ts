import * as yup from "yup"

export const createUserSchema = yup.object({
    name: yup.string().required('O nome é Obrigatório'),
    email: yup.string().email().required("Email é obrigatório"),
    password: yup.string().min(6, 'A senha deve ter mais de 6 digitos').required("Senha é obrigatória"),
    role: yup.string().oneOf(["ADMIN", "LAB"], 'O valores devem ser ADMIN  ou  LAB').required(),
    laboratoryId: yup.string().optional()
})

export type CreateUserType = yup.InferType<typeof createUserSchema>