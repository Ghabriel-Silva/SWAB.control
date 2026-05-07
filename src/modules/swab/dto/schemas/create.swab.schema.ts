import * as yup from "yup"

export const createSwabSchema = yup.object({
    tank: yup
    .array()
    .of(yup.string())
    .required('O tank é obrigatório')
    .min(1, 'Precisa ter pelo menos um item')
    .test("unique", "valores duplicados", (value)=>{
        if(!value) return true 
        const normalized = value.map(v=>v?.toLocaleLowerCase())
        return  new Set(normalized).size === value.length 
    })
})

export type CreateSwabType =  yup.InferType<typeof createSwabSchema>