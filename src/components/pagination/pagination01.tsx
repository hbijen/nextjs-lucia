import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Paginated } from "@/lib/service/pagination-service"
import { Button } from "../ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"


type PaginationProps = {
    page: Paginated<any>
    prevPage: string
    nextPage: string
}

export default async function Pagination01(props: PaginationProps) {
    const { page } = props
    const from = (page.offset || 1)
    const to = from + (page.size ?? 0)
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center w-full">
            <div className="flex-1 text-xs text-muted-foreground">
                <div className="w-full">
                    Showing <strong>{from}-{to}</strong> of <strong>{page.total}</strong>
                </div>
            </div>

            <div className="flex-1 justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button variant={props.prevPage ? "outline" : "ghost"} className="w-full" disabled={props.prevPage == ''} asChild>
                                <Link href={props.prevPage} className={props.prevPage ? "" : "text-muted-foreground pointer-events-none opacity-50"}>
                                    <ChevronLeft className="h-4 w-4"></ChevronLeft>
                                    <span className="sr-only sm:not-sr-only">Previous</span>
                                </Link>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={props.nextPage ? "outline" : "ghost"} className="w-full" disabled={props.nextPage == ''} asChild>
                                <Link href={props.nextPage} className={props.nextPage ? "" : "text-muted-foreground pointer-events-none opacity-50"}>
                                    <span className="sr-only sm:not-sr-only">Next</span><ChevronRight className="h-4 w-4"></ChevronRight>
                                </Link>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}