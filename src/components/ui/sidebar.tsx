import { useMemo, useState, type ReactNode } from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SidebarContext } from "./sidebar-context";
import { useSidebar } from "@/hooks/useSidebar";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,
      setMobileOpen,
      toggle: () => setCollapsed((value) => !value),
    }),
    [collapsed, mobileOpen],
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function Sidebar({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  const content = <div className="flex h-full flex-col">{children}</div>;
  return (
    <>
      <aside
        data-collapsed={collapsed}
        className={cn(
          "hidden h-svh shrink-0 border-r bg-sidebar transition-[width] duration-200 md:block",
          collapsed ? "w-18" : "w-64",
          className,
        )}
        style={style}
      >
        {content}
      </aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" showCloseButton={false} className="w-72 border-r-0 p-0" style={style}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {content}
        </SheetContent>
      </Sheet>
    </>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle, setMobileOpen } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label="Toggle sidebar"
      onClick={() => {
        if (window.matchMedia("(max-width: 767px)").matches)
          setMobileOpen(true);
        else toggle();
      }}
    >
      <PanelLeft />
    </Button>
  );
}
export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-3", className)} {...props} />;
}
export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto p-3", className)}
      {...props}
    />
  );
}
export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("border-t p-3", className)} {...props} />;
}
export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return <main className={cn("min-w-0 flex-1", className)} {...props} />;
}
