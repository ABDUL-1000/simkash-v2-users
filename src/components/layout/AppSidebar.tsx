import { useState } from "react";
import { ChevronDown, ChevronRight, LogOut, ArrowRight, Loader2 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { type NavigationItem } from "@/constants/navigation";
import { getNavigationByRole } from "@/utils/auth/roleNavigation";
import { useAuthStore } from "@/store/authStore";
import { useSidebar } from "@/hooks/useSidebar";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { useLogoutUser } from "@/features/auth/api/useLogoutUser";
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
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const Icon = item.icon;
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Check if any child is active
  const isChildActive =
    hasChildren &&
    item.children?.some(
      (child) =>
        Boolean(child.href) &&
        (child.href === location.pathname ||
          (child.href !== "/" && location.pathname.startsWith(child.href!)))
    );
  const [expansion, setExpansion] = useState<{ pathname: string; expanded: boolean } | null>(null);
  const expanded = expansion?.pathname === location.pathname ? expansion.expanded : Boolean(isChildActive);

  if (hasChildren && !collapsed) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => setExpansion({ pathname: location.pathname, expanded: !expanded })}
          className={cn(
            "group flex w-full min-h-10 items-center gap-3 rounded-xl px-3 text-[13px] transition-colors",
            isChildActive
              ? "bg-[#EFF4F8] font-bold text-[#1F3A5F]"
              : "text-[#66738C] hover:bg-slate-100 hover:text-[#0F152A]"
          )}
        >
          {Icon && <Icon className="size-4 shrink-0 opacity-80" />}
          <span className="min-w-0 flex-1 truncate font-medium text-left">{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-bold",
                item.badgeTone === "danger"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              )}
            >
              {item.badge}
            </span>
          )}
          {expanded ? (
            <ChevronDown className="size-3.5 text-slate-400 opacity-60" />
          ) : (
            <ChevronRight className="size-3.5 text-slate-400 opacity-60" />
          )}
        </button>

        {expanded && (
          <div className="pl-6 space-y-1">
            {item.children?.map((child) => (
              <NavLink
                key={child.id}
                to={child.href || "#"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex min-h-8 items-center justify-between gap-2 rounded-lg px-3 text-xs transition-colors",
                    isActive
                      ? "bg-[#2563EB] font-bold text-white shadow-xs"
                      : "text-[#66738C] hover:bg-slate-100 hover:text-[#0F152A]"
                  )
                }
              >
                <span className="truncate">{child.label}</span>
                {child.badge && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                      child.badgeTone === "danger"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    )}
                  >
                    {child.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

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
              : "bg-blue-100 text-blue-600"
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
            : "text-[#66738C] hover:bg-slate-100 hover:text-[#0F152A]"
        )
      }
    >
      {row}
    </NavLink>
  );
}

export function AppSidebar() {
  const { collapsed, setMobileOpen } = useSidebar();
  const { user, profile } = useGetAuthUser();
  const role = useAuthStore(state => state.user?.role);
  const navigation = getNavigationByRole(role);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogoutUser();

  const displayName =
    profile?.fullname ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";
  const displayEmail = user?.email || "";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n: string) => n[0].toUpperCase())
      .join("") || "U";
  const roleName = role || profile?.role || user?.role || "User";

  const handleLogout = () => {
    logoutUser();
  };

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
              {profile?.profile_picture ? (
                <AvatarImage src={profile.profile_picture} alt={displayName} />
              ) : null}
              <AvatarFallback className="rounded-full bg-[#2563EB] font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-[#8C909B]">Good Afternoon</p>
              <p className="truncate text-sm font-bold text-[#0F152A]">
                {displayName}
              </p>
              <p className="text-[11px] text-[#8C909B] capitalize">{roleName.toLowerCase()}</p>
            </div>
          </div>
        )}

        {/* Navigation items grouped by sections */}
        <nav aria-label="User navigation" className="space-y-4">
          {navigation.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {idx > 0 && <div className="my-2 border-t border-[#E2ECF6]" />}
              {section.label && !collapsed && (
                <p className="px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  {section.label}
                </p>
              )}
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
          {collapsed ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="cursor-pointer rounded-lg p-1.5 text-[#8C909B] transition-colors hover:bg-slate-100 hover:text-red-600 disabled:opacity-50"
              title="Logout"
            >
              {isLoggingOut ? (
                <Loader2 className="size-5 animate-spin text-blue-600" />
              ) : (
                <LogOut className="size-5" />
              )}
            </button>
          ) : (
            <>
              <Avatar className="size-9 rounded-full">
                {profile?.profile_picture ? (
                  <AvatarImage src={profile.profile_picture} alt={displayName} />
                ) : null}
                <AvatarFallback className="rounded-full bg-[#D0DFF0] font-bold text-[#1F3A5F]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-[#0F152A]">
                  {displayName}
                </p>
                <p className="truncate text-[11px] text-[#8C909B]">
                  {displayEmail}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer rounded-lg p-1.5 text-[#8C909B] transition-colors hover:bg-slate-100 hover:text-red-600 disabled:opacity-50"
                title="Logout"
              >
                {isLoggingOut ? (
                  <Loader2 className="size-4 animate-spin text-blue-600" />
                ) : (
                  <LogOut className="size-4" />
                )}
              </button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
