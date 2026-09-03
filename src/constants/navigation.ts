import {
  Clock,
  // Cpu,
  Grid2X2,
  // Hash,
  Headphones,
  InfinityIcon,
  Receipt,
  Settings,
  Share2,
  Smartphone,
  Store,
  // Wallet,
  List,
  type LucideIcon,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";

export type NavigationChild = {
  id: string;
  label: string;
  href?: string;
  badge?: string;
  outlined?: boolean;
};

export type NavigationItem = {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeTone?: "info" | "danger";
  hasChevron?: boolean;
  children?: NavigationChild[];
  outlined?: boolean;
};

export type NavigationSection = {
  label?: string;
  collapsible?: boolean;
  items: NavigationItem[];
};

export const userNavigation: NavigationSection[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", href: appPaths.dashboard, icon: Grid2X2 },
      // { id: "wallet", label: "My Wallet", href: appPaths.wallet, icon: Wallet },
      { id: "bill-payments", label: "Bill Payments", href: appPaths.billPayments, icon: Receipt, hasChevron: true },
      { id: "device-sim", label: "Device SIM", href: appPaths.deviceSim, icon: Smartphone, hasChevron: true },
      // { id: "esim", label: "eSIM", href: appPaths.esim, icon: Cpu },
      // { id: "virtual-number", label: "Virtual Number", href: appPaths.virtualNumber, icon: Hash },
      { id: "zero-limit-sim", label: "Zero Limit SIM", href: appPaths.zeroLimitSim, icon: InfinityIcon, hasChevron: true },
      { id: "paylater", label: "PayLater", href: appPaths.payLater, icon: Clock },
      { id: "marketplace", label: "Marketplace", href: appPaths.marketplace, icon: Store },
      { id: "transactions", label: "Transactions", href: appPaths.transactions, icon: List },
      { id: "referrals", label: "Referrals", href: appPaths.referrals, icon: Share2 },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "settings", label: "Settings", href: appPaths.settings, icon: Settings },
      { id: "support", label: "Support", href: appPaths.support, icon: Headphones },
    ],
  },
];

export const adminNavigation = userNavigation;
