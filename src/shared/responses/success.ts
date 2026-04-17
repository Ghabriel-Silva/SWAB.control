export function successResponse<T>(
    data:T, 
    message:string, 
    meta?:any
){
    return{
        success:true, 
        message:message, 
        data:data, 
        meta:meta ?? null
    }
}