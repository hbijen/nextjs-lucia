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
        <div className="flex-1">
            <div className="text-xs text-muted-foreground">
                Showing <strong>{1}-10</strong> of <strong>32</strong>
            </div>

            <div>
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