import { z } from "zod";

export const PaginationParams = z.object({
    offset: z.string().transform(d => parseInt(d)).optional(),
    size: z.string().transform(d => parseInt(d)).optional()
})
export type PaginationParams = z.infer<typeof PaginationParams>

export type Paginated<T> = {
    offset: number,
    size: number,
    total: number,
    data?: T[] | undefined
}

export const getQueryParam = (pair: any) => {
    const searchParams = new URLSearchParams()
    for (const key in pair) {
        if (pair[key] !== null || pair[key] !== undefined) {
            searchParams.append(key, pair[key])
        }
    }
    return searchParams.toString()
}

export const getPaginationUrl = (currentSearchParams: PaginationParams, page: Paginated<any>) => {
    const { offset, size, total } = page
    
    console.log('page ', page, currentSearchParams)

    const prevOffset = offset ? offset - size : 0
    const nextOffset = offset + size
    const prevPageParams = {...currentSearchParams, offset: prevOffset, size: size}
    const nextPageParams = {...currentSearchParams, offset: nextOffset, size: size}
    console.log('prevPageParams: ', prevPageParams, "nextPageParams: ", nextPageParams)
    const prevPage = prevOffset < offset ? `./user?${getQueryParam(prevPageParams)}` : ''
    const nextPage = nextOffset < total ? `./user?${getQueryParam(nextPageParams)}` : ''

    console.log('prevPage ', prevPage)
    console.log('nextPage ', nextPage)
    return [prevPage, nextPage]
}

