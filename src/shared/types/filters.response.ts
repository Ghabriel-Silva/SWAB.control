
export interface MetaFilter {
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface SwabFilterResponse<T> {
    data: T,
    meta: MetaFilter
}