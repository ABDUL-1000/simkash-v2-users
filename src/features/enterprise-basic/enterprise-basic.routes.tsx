import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import EnterpriseBasicDashboardPage from "./pages/EnterpriseBasicDashboardPage";
import EnterpriseBasicInvestmentPage from "./investment/pages/EnterpriseBasicInvestmentPage";
import EnterpriseBasicCustomersPage from "./customers/pages/EnterpriseBasicCustomersPage";
import EnterpriseBasicInventoryPage from "./inventory/pages/EnterpriseBasicInventoryPage";
import EnterpriseBasicPricingPage from "./pricing/pages/EnterpriseBasicPricingPage";
import EnterpriseBasicWalletPage from "./wallet/pages/EnterpriseBasicWalletPage";

export const enterpriseBasicRoutes: TRouteData[] = [
  {
    path: appPaths.enterpriseBasicDashboard,
    element: <EnterpriseBasicDashboardPage />,
    title: "Enterprise Basic Dashboard",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseBasicInvestment,
    element: <EnterpriseBasicInvestmentPage />,
    title: "Enterprise Basic My Investment",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseBasicCustomers,
    element: <EnterpriseBasicCustomersPage />,
    title: "Enterprise Basic My Customers",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseBasicInventory,
    element: <EnterpriseBasicInventoryPage />,
    title: "Enterprise Basic Inventory",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseBasicPricing,
    element: <EnterpriseBasicPricingPage />,
    title: "Enterprise Basic Commission & Pricing",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseBasicWallet,
    element: <EnterpriseBasicWalletPage />,
    title: "Enterprise Basic My Wallet",
    isSearchable: true,
  },
];

