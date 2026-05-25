import { SwabResponseDTO } from "./swab.filter.response.dto"

export interface MetaSwabFilter {
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface SwabFilterResponse {
    data: SwabResponseDTO[], 
    meta:MetaSwabFilter
}