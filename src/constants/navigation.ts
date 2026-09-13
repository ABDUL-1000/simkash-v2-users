import {
  Activity,
  Clock,
  Headphones,
  InfinityIcon,
  LayoutDashboard,
  MapPin,
  Package,
  Receipt,
  Settings,
  Share2,
  Smartphone,
  Store,
  Trophy,
  Users,
  Wallet,
  List,
  Zap,
  Landmark,
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
    label: "Dashboards",
    items: [
      {
        id: "user-dashboard",
        label: "User Dashboard",
        href: appPaths.dashboard,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Regional Manager",
    items: [
      {
        id: "rm-dashboard",
        label: "RM Dashboard",
        href: appPaths.regionalManagerDashboard,
        icon: Landmark,
        badge: "RM",
      },
      {
        id: "rm-sim-inventory",
        label: "SIM Inventory",
        icon: Package,
        badge: "RM",
        children: [
          {
            id: "rm-available-stock",
            label: "Available Stock",
            href: appPaths.rmSimInventory,
          },
          {
            id: "rm-redistribute-sims",
            label: "Redistribute SIMs",
            href: appPaths.rmRedistributeSims,
          },

        ],
      },
      {
        id: "rm-network-activity",
        label: "Network Activity",
        href: appPaths.scNetwork,
        icon: Activity,
        badge: "RM",
      },
      {
        id: "rm-bonus-tracker",
        label: "Bonus Tracker",
        href: appPaths.scBonusTracker,
        icon: Trophy,
        badge: "RM",
      },
      { id: "rm-wallet", label: "My Wallet", href: appPaths.wallet, icon: Wallet },

    ],
  },
  {
    label: "State Coordinator",
    items: [
      {
        id: "sc-dashboard",
        label: "SC Dashboard",
        href: appPaths.stateCoordinatorDashboard,
        icon: MapPin,
        badge: "SC",
      },
      {
        id: "sim-inventory",
        label: "SIM Inventory",
        href: appPaths.scSimInventory,
        icon: Package,
        badge: "SC",
      },
      {
        id: "network-activity",
        label: "Network Activity",
        href: appPaths.scNetwork,
        icon: Activity,
        badge: "SC",
      },
      {
        id: "bonus-tracker",
        label: "Bonus Tracker",
        href: appPaths.scBonusTracker,
        icon: Trophy,
        badge: "SC",
      },
      {
        id: "agency-partner",
        label: "Agency Partners",
        href: appPaths.agencyPartner,
        icon: Users,
        badge: "SC",
      },
      { id: "sc-wallet", label: "My Wallet", href: appPaths.wallet, icon: Wallet },

    ],
  },
  {
    label: "Agency Partner",
    items: [
      {
        id: "ap-dashboard",
        label: "AP Dashboard",
        href: appPaths.agencyPartnerDashboard,
        icon: Users,
        badge: "AP",
      },
      {
        id: "sim-activation",
        label: "SIM Activation",
        href: appPaths.simActivation,
        icon: Zap,
        badge: "AP",
      },
      {
        id: "ap-sim-stock",
        label: "My SIM Stock",
        icon: Package,
        badge: "AP",
        children: [
          {
            id: "available-sims",
            label: "Available SIMs",
            href: appPaths.apSimStock,
          },
          {
            id: "ap-customers",
            label: "My Customers",
            href: appPaths.apCustomers,
          },
        ],
      },
      {
        id: "ap-bonus-tracker",
        label: "Bonus Tracker",
        href: appPaths.scBonusTracker,
        icon: Trophy,
        badge: "AP",
      },
      { id: "ap-wallet", label: "My Wallet", href: appPaths.wallet, icon: Wallet },

    ],
  },
  {
    label: "Main Navigation",
    items: [
      { id: "wallet", label: "My Wallet", href: appPaths.wallet, icon: Wallet },
      { id: "bill-payments", label: "Bill Payments", href: appPaths.billPayments, icon: Receipt, hasChevron: true },
      { id: "device-sim", label: "Device SIM", href: appPaths.deviceSim, icon: Smartphone, hasChevron: true },
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
