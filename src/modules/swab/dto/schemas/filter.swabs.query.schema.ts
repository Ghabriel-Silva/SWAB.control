import * as yup from 'yup'
import { SwabCheckType } from '../../domain/swabCheck.enum'
import { SwabCheckResult } from '../../domain/swabResult.enum'

export const filterSwabsQuerySchema = yup.object({
    page: yup
        .number()
        .transform(value => Number(value))
        .typeError('page deve ser um número')
        .min(1, 'page deve ser maior que 0')
        .optional(),

    limit: yup
        .number()
        .transform(value => Number(value))
        .typeError('limit deve ser um número')
        .min(1, 'limit deve ser maior que 0')
        .max(100, 'limit deve ser no máximo 100')
        .optional(),

    locationId: yup
        .string()
        .uuid('tankId deve ser um UUID válido')
        .optional(),

    operatorId: yup
        .string()
        // .uuid('operatorId deve ser um UUID válido') //mudar quando criar operador validos
        .optional(),

    performedType: yup
        .mixed<SwabCheckType>()
        .oneOf(
            Object.values(SwabCheckType),
            'tipo de Swab inválido'
        )
        .optional(),

    result: yup
        .mixed<SwabCheckResult>()
        .oneOf(
            Object.values(SwabCheckResult),
            'result inválido'
        )
        .optional(),

    isCancelled: yup
        .boolean()
        .transform((value, originalValue) => {
            if (originalValue === 'true') return true
            if (originalValue === 'false') return false
            return value
        })
        .typeError('isCancelled deve ser true ou false')
        .optional(),

    internalCode: yup
        .string()
        .trim()
        .max(20, ' O lote deve ter no máximo 20 caracteres')
        .optional(),

    startDate: yup
        .date()
        .typeError('Data inicial deve ser uma data válida')
        .optional(),

    endDate: yup
        .date()
        .typeError('Data final deve ser uma data válida')
        .when('startDate', {
            is: (value: Date | undefined) => value !== undefined,
            then: (schema) =>
                schema.min(
                    yup.ref('startDate'),
                    'Data final não pode ser menor que a data inicial'
                ),

            otherwise: (schema) =>
                schema.test(
                    'startDate-required',
                    'A data inicial é obrigatória quando existir data final',
                    function (value) {
                        if (value && !this.parent.startDate) {
                            return false;
                        }

                        return true;
                    }
                ),
        })
        .optional(),

    order: yup
        .mixed<'ASC' | 'DESC'>()
        .oneOf(
            ['ASC', 'DESC'],
            'order deve ser ASC ou DESC'
        )
        .optional()
})
    .noUnknown(true, 'Parâmetros inválidos enviados')

export type FilterSwabsQueryType = yup.InferType<typeof filterSwabsQuerySchema>