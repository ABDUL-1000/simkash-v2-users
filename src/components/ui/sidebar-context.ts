import { createContext } from "react";

export type SidebarState = { collapsed: boolean; mobileOpen: boolean; toggle: () => void; setMobileOpen: (open: boolean) => void };
export const SidebarContext = createContext<SidebarState | null>(null);
