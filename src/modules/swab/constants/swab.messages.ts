export const SWAB_MESSAGES = {
    CREATE: {
        SUCCESS: 'Processamento concluído',
        NO_SWABS_CREATED: 'Nenhum swab foi criado',

        PENDING_SWAB: (location: string) =>
            `A localização ${location} possui swab pendente`,

        PENDING_CHECK: (location: string) =>
            `A localização ${location} possui swab sem check`,
    },

    UPDATE: {
        SUCCESS: (swabLote: string) =>
            `SWAB ${swabLote} atualizado com sucesso`,

        NOT_FOUND: 'Swab não encontrado ou cancelado',

        OPERATOR_NOT_FOUND: 'Operador não encontrado',

        SAME_FAUCET_JUSTIFICATION:
            'Informe uma justificativa para reutilizar a mesma torneira.',

        ATP_LIMIT_OBSERVATION:
            'Você não pode aprovar um Swab com o ATP maior que a especificação',

        ATP_TO_VISUAL_JUSTIFICATION:
            'Swab ATP não pode ser mudado para swab do tipo VISUAL sem justificativa, justifique de forma clara o motivo da mudança',

        UPDATE_ERROR: (location: string) =>
            `Não foi possível atualizar o swab do localização ${location}`,

        NOT_UPDATED_SWAB_TYPE:
            'Não é permitido alterar o tipo do swab mais de uma vez para o mesmo registro.'
    },

    DELETE: {
        SUCCESS: (swabLote: string) =>
            `SWAB ${swabLote} cancelado com sucesso`,

        NOT_FOUND_OR_CANCELED:
            'Swab não encontrado ou já cancelado',

        ERROR_TO_CANCEL:
            'Não foi possível cancelar o swab'
    },

    QUERY: {
        FILTER_SUCCESS:
            'Filtros aplicados com sucesso',

        FILTER_EMPTY:
            'Nenhum resultado encontrado para os filtros informados'
    }
}