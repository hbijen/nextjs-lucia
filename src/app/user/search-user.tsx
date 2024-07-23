import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { searchUsers } from "./actions";
import { Button } from "@/components/ui/button";

export default async function SearchUser() {

    return (
        <form action={searchUsers}>
            <div className="grid grid-cols-2 gap-4 items-center justify-items-start">
                <div className="relative flex flex-1 flex-shrink-0">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <Input
                        id="search"
                        name="search"
                        className="pl-10"
                        placeholder="Search users..."
                    />
                    <SearchIcon className="absolute h-[18px] w-[18px] left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                <Button size="sm" className="h-8 gap-1" type="submit">
                    <SearchIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Search
                    </span>
                </Button>
            </div>
        </form>
    )
}

