'use client'
import Link from "next/link";
import React from "react";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AdminSearch from "../components/features/admin-search";
import { ModeToggle } from "../components/ModeToggle";
import { useGlobalContext } from "../Context/store";
import { TbBoxModel2 } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token, setToken } = useGlobalContext();
  const router = useRouter()
  const handleLogout =()=>{
    setToken("");
    router.push("/")
  }
  return <div className="h-screen flex">

    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href={`/orders?customToken=${token}`} className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
              <MdOutlineAdminPanelSettings size={25} />
              <span className="">Admin Panel</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* <Link
                href={`/dashboard?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link> */}
              <Link
                href={`/orders?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
              <Link
                href={`/category?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary"
              >
                {/* <Package className="h-4 w-4" /> */}
                <BiCategory size={16} />
                Categories
              </Link>
              <Link
                href={`/brand?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Brand
              </Link>
              <Link
                href={`/model?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary"
              >
                {/* <Package className="h-4 w-4" /> */}
                <TbBoxModel2 size={16} />
                Models
              </Link>
              <Link
                href={`/product?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary"
              >
                {/* <Package className="h-4 w-4" /> */}
                <AiOutlineProduct size={16} />
                Products
              </Link>
              {/* <Link
                href={`/user?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                User
              </Link> */}
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link> */}
            </nav>
          </div>

        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href={`/orders?customToken=${token}`}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  {/* <Package2 className="h-6 w-6" /> */}
                  <MdOutlineAdminPanelSettings size={25} />
                  <span className="sr-only">Admin Panel</span>
                </Link>
                {/* <Link
                href={`/dashboard?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link> */}
              <Link
                href={`/orders?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
              <Link
                href={`/category?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary"
              >
                <BiCategory size={16} />
                Categories
              </Link>
              <Link
                href={`/product?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary"
              >
                <AiOutlineProduct size={16} />
                Products
              </Link>
              {/* <Link
                href={`/user?customToken=${token}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                User
              </Link> */}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <AdminSearch />
          </div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  </div>
}