export interface MethodArgumentType {
    name: string
    type: string
}

export type MethodRunProps = {
    title: string
    category: string
    args: MethodArgumentType[]
    size: number
}

export type MethodSearchProps = {
    value: string
    setValue: any
    filtered: any[]
    setFiltered: any
}