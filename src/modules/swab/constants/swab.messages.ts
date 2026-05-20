export const SWAB_MESSAGES = {
    CREATE: {
        SUCCESS: 'Processamento concluído',
        NO_SWABS_CREATED: 'Nenhum swab foi criado',

        PENDING_SWAB: (tank: string) =>
            `O tank ${tank} possui swab pendente`,

        PENDING_CHECK: (tank: string) =>
            `O tank ${tank} possui swab sem check`,
    },

    UPDATE: {
        SUCCESS: (swabLote: string) =>
            `SWAB ${swabLote} atualizado com sucesso`,

        NOT_FOUND: 'Swab não encontrado ou cancelado',

        OPERATOR_NOT_FOUND: 'Operador não encontrado',

        SAME_FAUCET_JUSTIFICATION:
            'Informe uma justificativa para reutilizar a mesma torneira.',

        ATP_LIMIT_OBSERVATION:
            'Observação é obrigatória quando o ATP é maior que o limite definido',

        ATP_TO_VISUAL_JUSTIFICATION:
            'Swab ATP não pode ser mudado para swab do tipo VISUAL sem justificativa, justifique de forma clara o motivo da mudança',

        UPDATE_ERROR: (tank: string) =>
            `Não foi possível atualizar o swab do tank ${tank}`
    },

    DELETE: {
        SUCCESS:
            'Swab cancelado com sucesso',

        NOT_FOUND_OR_CANCELED:
            'Swab não encontrado ou já cancelado',

        ERROR_TO_CANCEL:
            'Não foi possível cancelar o swab'
    },

    QUERY: {
        NOT_FOUND: 'Swab não encontrado'
    }
}