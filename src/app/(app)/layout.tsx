import {
  Home,
  LineChart,
  Package2,
  Settings,
  Users
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import { logout, validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="grid min-h-screen w-full sm:grid-cols-[60px_1fr] xl:grid-cols-[280px_1fr]">
      <div className="hidden min-h-screen border-r bg-muted/40 md:block">
        <div className="flex min-h-screen flex-col gap-4">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only xl:not-sr-only">Acme Inc</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only xl:not-sr-only">Dashboard</span>
              </Link>
              <Link href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                <span className="sr-only xl:not-sr-only">Analytics</span>
              </Link>
              <Link href="/user"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                <span className="sr-only xl:not-sr-only">Users</span>
              </Link>

              <Separator className="border-b mt-8"></Separator>
              <AccountSettings></AccountSettings>
            </nav>
          </div>
        </div>
      </div>
      <main className="sm:p-4 lg:p-6">
        {children}
      </main>
      <Toaster />
    </div>
  )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export function AccountSettings() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" >
          <Settings className="h-4 w-4"></Settings>
          <span className="sr-only xl:not-sr-only">Account</span>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" >
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={logout}>
            <Button type="submit" variant="ghost" className="h-4">Sign out</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}