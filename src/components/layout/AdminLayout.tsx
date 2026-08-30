import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppNavbar } from "./AppNavbar";
import { AppSidebar } from "./AppSidebar";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full overflow-hidden bg-[#F7F9FC]">
        <AppSidebar />
        <SidebarInset className="flex h-svh flex-col overflow-hidden bg-[#F7F9FC]">
          <AppNavbar />
          <div className="flex-1 overflow-y-auto bg-[#F7F9FC]">
            <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export const UserLayout = AdminLayout;
