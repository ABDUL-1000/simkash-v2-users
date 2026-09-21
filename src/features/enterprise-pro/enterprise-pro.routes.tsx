import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { Navigate } from "react-router-dom";
import EnterpriseProDashboardPage from "./pages/EnterpriseProDashboardPage";
import { MyInvestmentPage } from "./investment";
import { MyEnterpriseWalletPage } from "./wallet";
import {
  EpSimInventoryPage,
  DistributeSIMsPage,
  DistributionCompletePage,
  OrderMoreSimsPage,
  OrderPlacedPage,
  InventoryHistoryPage,
} from "./inventory";
import { MyNetworkPage } from "./network";
import { EnterpriseProPricingPage } from "./pricing";

export const enterpriseProRoutes: TRouteData[] = [
  {
    path: appPaths.enterpriseProDashboard,
    element: <EnterpriseProDashboardPage />,
    title: "Enterprise Pro Dashboard",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProInvestment,
    element: <MyInvestmentPage />,
    title: "Enterprise Pro Investment",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProWallet,
    element: <MyEnterpriseWalletPage />,
    title: "Enterprise Pro Wallet",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProSimInventory,
    element: <EpSimInventoryPage />,
    title: "Enterprise Pro SIM Inventory",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProSimDistribute,
    element: <DistributeSIMsPage />,
    title: "Distribute SIMs to SCs",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProDistributionComplete,
    element: <DistributionCompletePage />,
    title: "SIM Distribution Complete",
    isSearchable: false,
  },
  {
    path: appPaths.enterpriseProOrderMoreSims,
    element: <OrderMoreSimsPage />,
    title: "Order Wholesale SIMs",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProOrderPlaced,
    element: <OrderPlacedPage />,
    title: "SIM Order Placed",
    isSearchable: false,
  },
  {
    path: appPaths.enterpriseProInventoryHistory,
    element: <InventoryHistoryPage />,
    title: "SIM Inventory Audit Ledger",
    isSearchable: true,
  },
  {
    path: "/enterprise-pro",
    element: <Navigate to={appPaths.enterpriseProDashboard} replace />,
    title: "Enterprise Pro",
    isSearchable: false,
  },
  {
    path: appPaths.enterpriseProNetwork,
    element: <MyNetworkPage />,
    title: "Enterprise Pro Network",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProPricing,
    element: <EnterpriseProPricingPage />,
    title: "Commission & Pricing",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProOrders,
    element: <EnterpriseProDashboardPage />,
    title: "Enterprise Pro Orders",
    isSearchable: true,
  },
  {
    path: appPaths.enterpriseProRoi,
    element: <EnterpriseProDashboardPage />,
    title: "Enterprise Pro ROI Analysis",
    isSearchable: true,
  },
];
