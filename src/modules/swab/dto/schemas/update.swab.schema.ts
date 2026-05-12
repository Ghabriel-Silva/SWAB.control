import * as yup from "yup"

export const updateSwabSchema = yup.object({
    /**
     * {
    "operatorId": "operator-1",
    "result": "APROVETED",
    "performedType": "ATP",
    "valueAtp": 0, 
    "faucetCode": "F-02",
    "validatedAt": "2026-05-12T10:00:00.000Z",
    "batch": "2233",
    "observation": "Tank liberado sem inconsistências"
} 
     */

})

export type UpdateSwabType = yup.InferType<typeof updateSwabSchema>