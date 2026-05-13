import * as yup from "yup"
import { SwabCheckType } from "../../../SwabCheck/domain/swabCheck.enum"
import { SwabCheckResult } from "../../../SwabCheck/domain/swabResult.enum"

export const updateSwabSchema = yup.object({
    operatorId: yup
    .string()
    .required('O campo Operador é obrigatório'),

    result: yup
    .mixed<SwabCheckType>()
    .oneOf(
        Object.values(SwabCheckType), 
        "O valor para resultado deve ser VISUAL, ATP ou MICRO"
    )
    .required('O campo Resultado é obrigatório'),

    performedType: yup
    .mixed<SwabCheckResult>()
    .oneOf(
        Object.values(SwabCheckResult), 
        "O valor para Tipo do swab deve ser PENDING, APPROVED ou REPROVED"
    )
    .required('O campo Result é obrigatorio'), 

    valueAtp: yup
    .number()
    .integer('O valor do atp deve ser um valor inteiro')
    .positive('o valor do atp deve ser um valor positivo')
    .when('result', (result:any, schema:any)=>{
        if(result === 'ATP'){
            return 
        }
    }),
    


    



    /**
     * {
    "valueAtp": 0, 
    "faucetCode": "F-02",
    "validatedAt": "2026-05-12T10:00:00.000Z",
    "batch": "2233",
    "observation": "Tank liberado sem inconsistências"
} 
     */

})

export type UpdateSwabType = yup.InferType<typeof updateSwabSchema>