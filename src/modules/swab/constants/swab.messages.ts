export const SWAB_MESSAGES = {
    CREATE: {
        SUCCESS: 'Swab criado com sucesso',
        NO_SWABS_CREATED: 'Nenhum swab foi criado',

        PENDING_SWAB: (tank: string) =>
            `O tank ${tank} possui swab pendente`,

        PENDING_CHECK: (tank: string) =>
            `O tank ${tank} possui swab sem check`,
    },

    UPDATE: {
        SUCCESS: 'Swab atualizado com sucesso'
    },

    DELETE: {
        SUCCESS: 'Swab removido com sucesso'
    },

    QUERY: {
        NOT_FOUND: 'Swab não encontrado'
    }
}