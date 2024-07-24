import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


type PaginationProps = {
    prevPage?: string
    nextPage?: string
    total?: number
    page?:number
    size?:number
}

export default async function Pagination01(props: PaginationProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center w-full">
            <div className="flex-1 text-xs text-muted-foreground">
                <div className="w-full">
                    Showing <strong>{1}-10</strong> of <strong>32</strong>
                </div>
            </div>

            <div className="flex-1 justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className={!props.prevPage?'disabled':''} href={props.prevPage} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext className={!props.nextPage?'disabled':''} href={props.nextPage} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}