// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "../../styles/globals.css";

// import { Toaster } from "@/components/ui/toaster";
// import { validateRequest } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function SecureLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   const { user } = await validateRequest();
// 	if (!user) {
// 		return redirect("/login");
// 	}

//   return (
//     <section>
//       {children}
//       <Toaster />
//     </section>
//   );
// }

import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
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
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
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
            </nav>
          </div>
          <div className="mt-auto p-4 text-center">
            <Button size="sm" variant="ghost">
              <Settings className="h-4 w-4"></Settings>
              <span className="sr-only xl:not-sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </div>


      <main className="flex flex-1 flex-col sm:p-4 lg:p-6">
        <section>
          {children}
          <Toaster />
        </section>
      </main>
    </div>
  )
}
