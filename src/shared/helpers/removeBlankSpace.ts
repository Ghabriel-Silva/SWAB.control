//helper utilizado no yup para remoção de espações em brancos 
export function removeBlankSpace(_:any, v: string):string | null {
    if (typeof v !== 'string') {
        return v
    }

    const trimmed = v.trim()

    return trimmed === '' ? null : trimmed
}