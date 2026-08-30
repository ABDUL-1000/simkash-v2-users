import { ChevronRight, LogOut, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { userNavigation, type NavigationItem } from "@/constants/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { APP_COLORS } from "@/constants/colors";

function SimKashMark() {
  return (
    <div
      className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-600/20"
      aria-hidden="true"
    >
      S
    </div>
  );
}

function NavigationRow({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavigationItem;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const row = (
    <>
      {Icon && <Icon className="size-4 shrink-0 opacity-80 group-aria-[current=page]:text-[#2563EB]" />}
      {!collapsed && <span className="min-w-0 flex-1 truncate font-medium">{item.label}</span>}
      {!collapsed && item.badge && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-bold",
            item.badgeTone === "danger"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600",
          )}
        >
          {item.badge}
        </span>
      )}
      {!collapsed && item.hasChevron && (
        <ChevronRight className="size-3.5 text-slate-400 opacity-60" />
      )}
    </>
  );

  return (
    <NavLink
      to={item.href || "#"}
      aria-label={item.label}
      title={collapsed ? item.label : undefined}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex min-h-10 items-center gap-3 rounded-xl px-3 text-[13px] transition-colors",
          collapsed && "justify-center px-0",
          isActive
            ? "bg-[#EFF4F8] font-bold text-[#1F3A5F] aria-[current=page]:bg-[#EFF4F8]"
            : "text-[#66738C] hover:bg-slate-100 hover:text-[#0F152A]",
        )
      }
    >
      {row}
    </NavLink>
  );
}

export function AppSidebar() {
  const { collapsed, setMobileOpen } = useSidebar();

  return (
    <Sidebar
      className="border-r border-[#E2ECF6] bg-white text-[#0F152A]"
      style={{ backgroundColor: APP_COLORS.backgrounds.background }}
    >
      {/* Brand Header */}
      <SidebarHeader className="flex h-16 items-center border-b-0 px-4">
        <div
          className={cn(
            "flex w-full items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <SimKashMark />
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight text-[#0F152A]">
              Simkash
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        {/* User Card at top of Sidebar */}
        {!collapsed && (
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-[#F0F4F9] p-3">
            <Avatar className="size-11 shrink-0 rounded-full">
              <AvatarFallback className="rounded-full bg-[#2563EB] font-bold text-white">
                YA
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-[#8C909B]">Good Afternoon</p>
              <p className="truncate text-sm font-bold text-[#0F152A]">
                Yusuf Adam Baba
              </p>
              <p className="text-[11px] text-[#8C909B]">Normal User</p>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav aria-label="User navigation" className="space-y-4">
          {userNavigation.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {idx > 0 && <div className="my-2 border-t border-[#E2ECF6]" />}
              {section.items.map((item) => (
                <NavigationRow
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Partner Upgrade Banner at bottom */}
        {!collapsed && (
          <div className="mt-8 overflow-hidden rounded-2xl bg-[#0D1B2E] p-4 text-white shadow-lg">
            <h4 className="text-sm font-bold text-white">Become a Partner</h4>
            <p className="mt-1 text-xs text-slate-300">
              Earn <span className="font-bold text-white">₦1,000</span> per SIM activation
            </p>
            <button
              type="button"
              className="mt-3 flex items-center gap-1.5 rounded-full bg-[#2563EB] px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Upgrade <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </SidebarContent>

      {/* Footer User Profile */}
      <SidebarFooter className="border-t border-[#E2ECF6] p-3">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <Avatar className="size-9 rounded-full">
            <AvatarFallback className="rounded-full bg-[#D0DFF0] font-bold text-[#1F3A5F]">
              YA
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-[#0F152A]">
                  Yusuf Adam Baba
                </p>
                <p className="truncate text-[11px] text-[#8C909B]">
                  yusufababah50@gmail.com
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1.5 text-[#8C909B] hover:bg-slate-100 hover:text-red-600"
                title="Logout"
              >
                <LogOut className="size-4" />
              </button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
