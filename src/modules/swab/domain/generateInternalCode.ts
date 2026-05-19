import { prefixInternalCode } from "./prefixInternalCode"

export function generateInternalCode(sequential: number): string {
    const prefix = prefixInternalCode()
    const formatSequencial = String(sequential).padStart(4, '0')
    return `${prefix}${formatSequencial}`
}