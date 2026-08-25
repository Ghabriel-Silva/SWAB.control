

export const OPERATOR_MESSAGES = {
    CREATE: {
        INVALID_CARGO: "Cargo inválido. Verifique se esse registro existe.",
        INVALID_LABORATORY: "Laboratório inválido. Verifique se esse registro existe.",
        NAME_ALREADY_EXISTS: (name: string) => `O nome "${name}" já está cadastrado no sistema.`,
        CREATE_ERROR: "Erro ao criar operador.",
        CREATE_SUCCESS: (name: string) => `Operador "${name}" criado com sucesso.`,
    },
    UPDATE: {

    },

    GET: {
        OPERATOR_FOUND: "Operadores encontrados com sucesso"
    }
}