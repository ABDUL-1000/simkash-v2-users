import { regionalManagerRoutes } from "../regional-manager/regional-manager.routes";
import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import DashboardPage from "./pages/DashboardPage";
import { StateCoordinatorDashboardPage } from "../state-coordinator/pages/StateCoordinatorDashboardPage";
import { ScWalletPage } from "../state-coordinator/pages/ScWalletPage";
import { ScSimInventoryPage } from "../state-coordinator/pages/ScSimInventoryPage";
import { ScNetworkPage } from "../state-coordinator/pages/ScNetworkPage";
import { ScActivationDetailsPage } from "../state-coordinator/pages/ScActivationDetailsPage";
import { ScBonusTrackerPage } from "../state-coordinator/pages/ScBonusTrackerPage";
import { ScBonusHistoryPage } from "../state-coordinator/pages/ScBonusHistoryPage";
import { SimActivationPage } from "../agency-partner/pages/SimActivationPage";
import CorporateAgentDashboardPage from "../corporate-agent/pages/CorporateAgentDashboardPage";
import CaSimInventoryPage from "../corporate-agent/inventory/pages/CaSimInventoryPage";
import CaSimActivationPage from "../corporate-agent/sim-activation/pages/CaSimActivationPage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import RegionalManagerDashboardPage from "../regional-manager/pages/RegionalManagerDashboardPage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import RmCustomersPage from "../regional-manager/pages/RmCustomersPage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import RmNetworkPerformancePage from "../regional-manager/pages/RmNetworkPerformancePage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import RmNetworkActivityPage from "../regional-manager/pages/RmNetworkActivityPage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import RmSimInventoryPage from "../regional-manager/pages/RmSimInventoryPage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import RmRedistributeSimsPage from "../regional-manager/pages/RmRedistributeSimsPage";
// Preserved legacy import; RM pages are registered in regional-manager.routes.tsx below. import StateCoordinatorDetailsPage from "../regional-manager/pages/StateCoordinatorDetailsPage";


export const dashboardRoutes: TRouteData[] = [
  ...regionalManagerRoutes,
  { path: appPaths.dashboard, element: <DashboardPage />, title: "Dashboard Overview", isSearchable: true },
  { path: appPaths.corporateAgentDashboard, element: <CorporateAgentDashboardPage />, title: "Corporate Agent Dashboard", isSearchable: true },
  { path: "/corporate-agent", element: <CorporateAgentDashboardPage />, title: "Corporate Agent Dashboard", isSearchable: false },
  { path: appPaths.caSimInventory, element: <CaSimInventoryPage />, title: "Corporate Agent SIM Inventory", isSearchable: true },
  { path: "/dashboard/corporate-agent/inventory", element: <CaSimInventoryPage />, title: "Corporate Agent SIM Inventory", isSearchable: false },
  { path: appPaths.caSimActivation, element: <CaSimActivationPage />, title: "Corporate Agent SIM Activation", isSearchable: true },
  { path: "/sim-activation/corporate-agent", element: <CaSimActivationPage />, title: "Corporate Agent SIM Activation", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.regionalManagerDashboard, element: <RegionalManagerDashboardPage />, title: "Regional Manager Dashboard", isSearchable: true },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmCustomers, element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: true },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmStateCoordinators, element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: "/customers/rm", element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmNetworkPerformance, element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: true },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: "/dashboard/regional-manager/performance", element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: "/performance/rm", element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmNetworkActivity, element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: true },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmNetwork, element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: "/dashboard/regional-manager/network", element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmSimInventory, element: <RmSimInventoryPage />, title: "RM SIM Inventory", isSearchable: true },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: "/dashboard/regional-manager/inventory", element: <RmSimInventoryPage />, title: "RM SIM Inventory", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmRedistributeSims, element: <RmRedistributeSimsPage />, title: "Redistribute SIMs", isSearchable: true },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: "/dashboard/regional-manager/redistribute", element: <RmRedistributeSimsPage />, title: "Redistribute SIMs", isSearchable: false },
  // Disabled legacy mount: mock pages/unsupported network APIs; live RM routes are registered below. { path: appPaths.rmScDetails().format, element: <StateCoordinatorDetailsPage />, title: "State Coordinator Details", isSearchable: false },
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
