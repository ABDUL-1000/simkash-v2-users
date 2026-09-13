import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import DashboardPage from "./pages/DashboardPage";
import { StateCoordinatorDashboardPage } from "./pages/StateCoordinatorDashboardPage";
import { ScWalletPage } from "./pages/ScWalletPage";
import { ScSimInventoryPage } from "./pages/ScSimInventoryPage";
import { ScNetworkPage } from "./pages/ScNetworkPage";
import { ScActivationDetailsPage } from "./pages/ScActivationDetailsPage";
import { ScBonusTrackerPage } from "./pages/ScBonusTrackerPage";
import { ScBonusHistoryPage } from "./pages/ScBonusHistoryPage";
import { SimActivationPage } from "./pages/SimActivationPage";
import { RegionalManagerDashboardPage } from "./regional-manager/pages/RegionalManagerDashboardPage";
import { StateCoordinatorDetailsPage } from "./regional-manager/pages/StateCoordinatorDetailsPage";
import { RmSimInventoryPage } from "./regional-manager/pages/RmSimInventoryPage";
import { RmRedistributeSimsPage } from "./regional-manager/pages/RmRedistributeSimsPage";

export const dashboardRoutes: TRouteData[] = [
  { path: appPaths.dashboard, element: <DashboardPage />, title: "Dashboard Overview", isSearchable: true },
  { path: appPaths.regionalManagerDashboard, element: <RegionalManagerDashboardPage />, title: "Regional Manager Dashboard", isSearchable: true },
  { path: appPaths.rmSimInventory, element: <RmSimInventoryPage />, title: "RM SIM Inventory", isSearchable: true },
  { path: "/dashboard/regional-manager/inventory", element: <RmSimInventoryPage />, title: "RM SIM Inventory", isSearchable: false },
  { path: appPaths.rmRedistributeSims, element: <RmRedistributeSimsPage />, title: "Redistribute SIMs", isSearchable: true },
  { path: "/dashboard/regional-manager/redistribute", element: <RmRedistributeSimsPage />, title: "Redistribute SIMs", isSearchable: false },
  { path: appPaths.rmScDetails().format, element: <StateCoordinatorDetailsPage />, title: "State Coordinator Details", isSearchable: false },
  { path: appPaths.stateCoordinatorDashboard, element: <StateCoordinatorDashboardPage />, title: "State Coordinator Dashboard", isSearchable: true },
  { path: appPaths.simActivation, element: <SimActivationPage />, title: "SIM Activation", isSearchable: true },
  { path: "/sim-activation", element: <SimActivationPage />, title: "SIM Activation", isSearchable: true },
  { path: appPaths.wallet, element: <ScWalletPage />, title: "My Wallet", isSearchable: true },
  { path: appPaths.scWallet, element: <ScWalletPage />, title: "SC Wallet", isSearchable: true },
  { path: appPaths.scSimInventory, element: <ScSimInventoryPage />, title: "SIM Inventory", isSearchable: true },
  { path: "/sim-inventory", element: <ScSimInventoryPage />, title: "SIM Inventory Overview", isSearchable: true },
  { path: appPaths.scNetwork, element: <ScNetworkPage />, title: "Network Activity", isSearchable: true },
  { path: "/network", element: <ScNetworkPage />, title: "Network Activity", isSearchable: true },
  { path: appPaths.scActivationDetails().format, element: <ScActivationDetailsPage />, title: "Activation Details", isSearchable: true },
  { path: appPaths.scBonusTracker, element: <ScBonusTrackerPage />, title: "Bonus Tracker", isSearchable: true },
  { path: appPaths.scBonusHistory, element: <ScBonusHistoryPage />, title: "Bonus History", isSearchable: true },
  { path: appPaths.bonusTracking, element: <ScBonusTrackerPage />, title: "Bonus Tracker", isSearchable: true },
  { path: "/bonus", element: <ScBonusTrackerPage />, title: "Bonus Tracker", isSearchable: true },
];
