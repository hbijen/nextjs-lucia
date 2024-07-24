
export type ErrorResponse = {
    error?: string | undefined
}

export interface AppResponse<T> {
    ok: boolean
    data?: T
    error?: string | undefined
}