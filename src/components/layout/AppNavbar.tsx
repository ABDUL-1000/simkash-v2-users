import { Bell, LogOut, Search, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import { appRouteConfig } from "@/app/router/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppNavbar() {
  const { pathname } = useLocation();
  const title =
    appRouteConfig.find((route) => route.path === pathname)?.title ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#E2ECF6] bg-white px-4 sm:px-6 lg:px-8">
      <SidebarTrigger className="shrink-0 text-[#0F152A]" />

      <div className="min-w-0">
        <h1 className="text-xl font-bold text-[#0F152A] sm:text-2xl">
          {title}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="text-[#0F152A] hover:bg-slate-100"
        >
          <Search className="size-5 text-[#0F152A]" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative text-[#0F152A] hover:bg-slate-100"
        >
          <Bell className="size-5 text-[#0F152A]" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-[#EF4444]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-auto rounded-full p-0 hover:bg-transparent"
                aria-label="Open user menu"
              />
            }
          >
            <Avatar className="size-10 rounded-full">
              <AvatarFallback className="rounded-full bg-[#2563EB] font-bold text-white">
                YA
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <span className="block text-sm font-semibold text-[#0F152A]">
                Yusuf Adam Baba
              </span>
              <span className="mt-0.5 block text-xs text-[#8C909B]">
                yusufababah50@gmail.com
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut className="mr-2 size-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
