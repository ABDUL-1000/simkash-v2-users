import { Navigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import type { TRouteData } from "@/app/router/route-types";
import { RegionalManagerDashboardPage } from "./pages/RegionalManagerDashboardPage";
import { RegionalManagerWalletPage } from "./pages/RegionalManagerWalletPage";
import { RegionalManagerInventoryPage } from "./pages/RegionalManagerInventoryPage";
import { RegionalManagerCoordinatorsPage } from "./pages/RegionalManagerCoordinatorsPage";
import { RegionalManagerCoordinatorPage } from "./pages/RegionalManagerCoordinatorPage";

// Keep all live RM routes together so sidebar links cannot silently return to legacy mock pages.
export const regionalManagerRoutes: TRouteData[] = [
  { path: appPaths.regionalManagerDashboard, element: <RegionalManagerDashboardPage />, title: "Regional Manager Dashboard", isSearchable: true },
  { path: appPaths.rmDashboard, element: <Navigate to={appPaths.regionalManagerDashboard} replace />, title: "Regional Manager Dashboard", isSearchable: false },
  { path: appPaths.rmWallet, element: <RegionalManagerWalletPage />, title: "RM Wallet", isSearchable: true },
  { path: appPaths.rmStateCoordinators, element: <RegionalManagerCoordinatorsPage />, title: "My State Coordinators", isSearchable: true },
  { path: appPaths.rmSimInventory, element: <RegionalManagerInventoryPage />, title: "RM SIM Inventory", isSearchable: true },
  { path: appPaths.rmCoordinatorDetail().format, element: <RegionalManagerCoordinatorPage />, title: "State Coordinator Details", isSearchable: false },
  { path: appPaths.rmRedistributeSims, element: <RegionalManagerInventoryPage key="redistribute" initialModal="redistribute" />, title: "Redistribute SIMs", isSearchable: false },
  { path: appPaths.rmScDetails().format, element: <RegionalManagerCoordinatorPage />, title: "State Coordinator Details", isSearchable: false },
  ...[appPaths.rmCustomers, "/customers/rm", "/dashboard/regional-manager/state-coordinators"].map(path => ({
    path, element: <Navigate to={appPaths.rmStateCoordinators} replace />, title: "My State Coordinators", isSearchable: false,
  })),
  ...["/sim-inventory/rm", "/dashboard/regional-manager/inventory"].map(path => ({
    path, element: <Navigate to={appPaths.rmSimInventory} replace />, title: "RM SIM Inventory", isSearchable: false,
  })),
  { path: "/dashboard/regional-manager/redistribute", element: <Navigate to={appPaths.rmRedistributeSims} replace />, title: "Redistribute SIMs", isSearchable: false },
];
