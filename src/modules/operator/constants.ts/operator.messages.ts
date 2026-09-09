

export const OPERATOR_MESSAGES = {
    CREATE: {
        INVALID_CARGO: "Cargo inválido. Verifique se esse registro existe.",
        INVALID_LABORATORY: "Laboratório inválido. Verifique se esse registro existe.",
        NAME_ALREADY_EXISTS: (name: string) => `O nome ${name} já está cadastrado no sistema.`,
        CREATE_ERROR: "Erro ao criar operador.",
        CREATE_SUCCESS: (name: string) => `Operador "${name}" criado com sucesso.`,
    },
    UPDATE: {
        OPERATOR_NOT_FOUND: "Operador não encontrado.",
        INVALID_CARGO: "Cargo não encontrado. Verifique se o registro informado existe.",
        INVALID_LABORATORY: "Laboratório não encontrado. Verifique se o registro informado existe.",
        NAME_ALREADY_EXISTS: (name: string) =>
            `O nome ${name} já está cadastrado no sistema.`,
        UPDATE_ERROR: "Não foi possível atualizar o operador.",
        UPDATE_SUCCESS: `Operador atualizado com sucesso.`,
    },

    GET: {
        OPERATOR_FOUND: "Operadores encontrados com sucesso"
    }
}