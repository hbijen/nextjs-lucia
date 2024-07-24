import {
  Edit,
  PlusCircle
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import Pagination01 from "@/components/pagination/pagination01"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserSearchParams, findUsers } from "@/lib/service/user-service"
import { APP_DATE_FORMAT } from "@/lib/utils"
import { format } from "date-fns"
import EnableDisableUser from "./enable-user"
import SearchUser from "./search-user"
import { getPaginationUrl } from "@/lib/service/pagination-service"
import { AddEditUser } from "./add-user"
import Link from "next/link"



export default async function ManageUsers({ searchParams }: { searchParams: UserSearchParams }) {
  console.log('searchParams', searchParams)
  const { data, ...page } = await findUsers(searchParams);
  const [prevPage, nextPage] = getPaginationUrl(searchParams, page)

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
        <div className="flex items-center">
          <div className="flex gap-2">
            <SearchUser name={searchParams.name ?? ''} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddEditUser>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add User
                </span>
              </Button>
            </AddEditUser>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage your users.
            </CardDescription>
          </CardHeader>
          <CardContent>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Email
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Provider
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map(user => {
                  return (<TableRow key={user.id}>
                    <TableCell className="font-medium p-2">

                      <Button size="sm" className="h-8 gap-1 focus-visible:ring-0" variant="link" asChild>
                        <Link href={`./user/${user.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sm:whitespace-nowrap">
                            {user.firstname} {user.lastname}
                          </span>
                        </Link>
                      </Button>

                    </TableCell>
                    <TableCell className="p-2">
                      <Badge variant="outline">{user.inactive_at ? 'Inactive' : 'Active'}</Badge>
                    </TableCell>
                    <TableCell className="p-2 hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="p-2 hidden lg:table-cell">
                      {user.provider}
                    </TableCell>
                    <TableCell className="p-2 hidden xl:table-cell">
                      {format(user.created_at!, APP_DATE_FORMAT)}
                    </TableCell>
                    <TableCell className="flex p-2 gap-2 w-20 sm:w-44 xl:w-36">
                      <EnableDisableUser id={user.id} inactive_at={user.inactive_at}></EnableDisableUser>
                    </TableCell>
                  </TableRow>)

                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Pagination01 page={page} prevPage={prevPage} nextPage={nextPage}></Pagination01>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}