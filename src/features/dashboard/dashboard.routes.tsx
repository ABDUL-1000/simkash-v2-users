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
import CaNetworkPage from "../corporate-agent/network/pages/CaNetworkPage";
import CorporateAgentActivationDetailPage from "../corporate-agent/network/pages/CorporateAgentActivationDetailPage";
import RegionalManagerDashboardPage from "../regional-manager/pages/RegionalManagerDashboardPage";
import RmCustomersPage from "../regional-manager/pages/RmCustomersPage";
import RmNetworkPerformancePage from "../regional-manager/pages/RmNetworkPerformancePage";
import RmNetworkActivityPage from "../regional-manager/pages/RmNetworkActivityPage";
import RmSimInventoryPage from "../regional-manager/pages/RmSimInventoryPage";
import RmRedistributeSimsPage from "../regional-manager/pages/RmRedistributeSimsPage";
import StateCoordinatorDetailsPage from "../regional-manager/pages/StateCoordinatorDetailsPage";
import { CaBonusTrackerPage } from "../corporate-agent/bonus/pages/CaBonusTrackerPage";
import { CaBonusHistoryPage } from "../corporate-agent/bonus/pages/CaBonusHistoryPage";
import InstallerDashboardPage from "../installer/pages/InstallerDashboardPage";
import ActiveJobsPage from "../installer/jobs/pages/ActiveJobsPage";
import PendingVerificationPage from "../installer/jobs/pages/PendingVerificationPage";
import CompletedJobsPage from "../installer/jobs/pages/CompletedJobsPage";
import DisputedJobsPage from "../installer/jobs/pages/DisputedJobsPage";
import JobDetailsPage from "../installer/jobs/pages/JobDetailsPage";
import { EasyBuyCommissionPage } from "../installer/jobs/pages/EasyBuyCommissionPage";
import { EasyBuyJobDetailsPage } from "../installer/jobs/pages/EasyBuyJobDetailsPage";


export const dashboardRoutes: TRouteData[] = [
  { path: appPaths.dashboard, element: <DashboardPage />, title: "Dashboard Overview", isSearchable: true },
  { path: appPaths.installerDashboard, element: <InstallerDashboardPage />, title: "Installer Workspace", isSearchable: true },
  { path: "/installer", element: <InstallerDashboardPage />, title: "Installer Workspace", isSearchable: false },
  { path: appPaths.installerJobs, element: <ActiveJobsPage />, title: "Installer My Jobs", isSearchable: true },
  { path: appPaths.installerJobsActive, element: <ActiveJobsPage />, title: "Active Jobs", isSearchable: true },
  { path: appPaths.installerJobsPending, element: <PendingVerificationPage />, title: "Pending Verification", isSearchable: true },
  { path: appPaths.installerJobsCompleted, element: <CompletedJobsPage />, title: "Completed Jobs", isSearchable: true },
  { path: appPaths.installerJobsDisputed, element: <DisputedJobsPage />, title: "Disputed Jobs", isSearchable: true },
  { path: appPaths.installerJobsEasyBuy, element: <EasyBuyCommissionPage />, title: "EasyBuy Jobs", isSearchable: true },
  { path: appPaths.installerJobsEasyBuyDetails().format, element: <EasyBuyJobDetailsPage />, title: "EasyBuy Job Details", isSearchable: false },
  { path: appPaths.installerJobDetails().format, element: <JobDetailsPage />, title: "Job Details", isSearchable: false },
  { path: appPaths.installerEarnings, element: <InstallerDashboardPage />, title: "Installer Earnings", isSearchable: false },
  { path: appPaths.corporateAgentDashboard, element: <CorporateAgentDashboardPage />, title: "Corporate Agent Dashboard", isSearchable: true },
  { path: "/corporate-agent", element: <CorporateAgentDashboardPage />, title: "Corporate Agent Dashboard", isSearchable: false },
  { path: appPaths.caSimInventory, element: <CaSimInventoryPage />, title: "Corporate Agent SIM Inventory", isSearchable: true },
  { path: "/dashboard/corporate-agent/inventory", element: <CaSimInventoryPage />, title: "Corporate Agent SIM Inventory", isSearchable: false },
  { path: appPaths.caSimActivation, element: <CaSimActivationPage />, title: "Corporate Agent SIM Activation", isSearchable: true },
  { path: "/sim-activation/corporate-agent", element: <CaSimActivationPage />, title: "Corporate Agent SIM Activation", isSearchable: false },
  { path: appPaths.caNetwork, element: <CaNetworkPage />, title: "Corporate Agent Network Activity", isSearchable: true },
  { path: appPaths.caActivationDetails().format, element: <CorporateAgentActivationDetailPage />, title: "Corporate Agent Activation Details", isSearchable: false },
  { path: appPaths.caBonusTracker, element: <CaBonusTrackerPage />, title: "Corporate Agent Bonus Tracker", isSearchable: true },
  { path: appPaths.caBonusHistory, element: <CaBonusHistoryPage />, title: "Corporate Agent Bonus History", isSearchable: true },
  { path: appPaths.regionalManagerDashboard, element: <RegionalManagerDashboardPage />, title: "Regional Manager Dashboard", isSearchable: true },
  { path: appPaths.rmCustomers, element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: true },
  { path: appPaths.rmStateCoordinators, element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: false },
  { path: "/customers/rm", element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: false },
  { path: appPaths.rmNetworkPerformance, element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: true },
  { path: "/dashboard/regional-manager/performance", element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: false },
  { path: "/performance/rm", element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: false },
  { path: appPaths.rmNetworkActivity, element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: true },
  { path: appPaths.rmNetwork, element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: false },
  { path: "/dashboard/regional-manager/network", element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: false },
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
