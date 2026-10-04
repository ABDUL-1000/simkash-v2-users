import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import DashboardPage from "./pages/DashboardPage";
import { StateCoordinatorDashboardPage } from "../state-coordinator/pages/StateCoordinatorDashboardPage";
import { ScWalletPage } from "../state-coordinator/pages/ScWalletPage";
import { UserWalletPage } from "../wallet/pages/UserWalletPage";
import { ScSimInventoryPage } from "../state-coordinator/pages/ScSimInventoryPage";
import { ScAgencyPartnersPage } from "../state-coordinator/pages/ScAgencyPartnersPage";
import { ScAgentDetailPage } from "../state-coordinator/pages/ScAgentDetailPage";
import { Navigate } from "react-router-dom";
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
// Legacy mock pages are preserved, but disabled: their static data/actions do not match the supplied RM API.
// import RmCustomersPage from "../regional-manager/pages/RmCustomersPage";
import { RegionalManagerWalletPage } from "../regional-manager/pages/RegionalManagerWalletPage";
import { RegionalManagerInventoryPage } from "../regional-manager/pages/RegionalManagerInventoryPage";
import { RegionalManagerCoordinatorsPage } from "../regional-manager/pages/RegionalManagerCoordinatorsPage";
import { RegionalManagerCoordinatorPage } from "../regional-manager/pages/RegionalManagerCoordinatorPage";
// Disabled: dedicated network page API unavailable. import RmNetworkPerformancePage from "../regional-manager/pages/RmNetworkPerformancePage";
// Disabled: dedicated network page API unavailable. import RmNetworkActivityPage from "../regional-manager/pages/RmNetworkActivityPage";
// import RmSimInventoryPage from "../regional-manager/pages/RmSimInventoryPage";
// import RmRedistributeSimsPage from "../regional-manager/pages/RmRedistributeSimsPage";
// import StateCoordinatorDetailsPage from "../regional-manager/pages/StateCoordinatorDetailsPage";
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
  { path: appPaths.rmDashboard, element: <Navigate to={appPaths.regionalManagerDashboard} replace />, title: "Regional Manager Dashboard", isSearchable: false },
  // { path: appPaths.rmCustomers, element: <RmCustomersPage />, title: "My State Coordinators", isSearchable: true }, // Disabled mock UI; live route below.
  { path: appPaths.rmWallet, element: <RegionalManagerWalletPage />, title: "RM Wallet", isSearchable: true },
  { path: appPaths.rmStateCoordinators, element: <RegionalManagerCoordinatorsPage />, title: "My State Coordinators", isSearchable: true },
  { path: appPaths.rmCoordinatorDetail().format, element: <RegionalManagerCoordinatorPage />, title: "State Coordinator Details", isSearchable: false },
  { path: appPaths.rmCustomers, element: <Navigate to={appPaths.rmStateCoordinators} replace />, title: "My State Coordinators", isSearchable: false },
  { path: "/dashboard/regional-manager/state-coordinators", element: <Navigate to={appPaths.rmStateCoordinators} replace />, title: "My State Coordinators", isSearchable: false },
  { path: "/customers/rm", element: <Navigate to={appPaths.rmStateCoordinators} replace />, title: "My State Coordinators", isSearchable: false },
  // Disabled: dedicated network page API unavailable. { path: appPaths.rmNetworkPerformance, element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: true },
  // Disabled: dedicated network page API unavailable. { path: "/dashboard/regional-manager/performance", element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: false },
  // Disabled: dedicated network page API unavailable. { path: "/performance/rm", element: <RmNetworkPerformancePage />, title: "Network Performance", isSearchable: false },
  // Disabled: dedicated network page API unavailable. { path: appPaths.rmNetworkActivity, element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: true },
  // Disabled: dedicated network page API unavailable. { path: appPaths.rmNetwork, element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: false },
  // Disabled: dedicated network page API unavailable. { path: "/dashboard/regional-manager/network", element: <RmNetworkActivityPage />, title: "RM Network Activity", isSearchable: false },
  // { path: appPaths.rmSimInventory, element: <RmSimInventoryPage />, title: "RM SIM Inventory", isSearchable: true }, // Disabled: mock contacts/recall/export have no supplied endpoint.
  // { path: appPaths.rmRedistributeSims, element: <RmRedistributeSimsPage />, title: "Redistribute SIMs", isSearchable: true }, // Disabled mock flow; live redistribution form below.
  // { path: appPaths.rmScDetails().format, element: <StateCoordinatorDetailsPage />, title: "State Coordinator Details", isSearchable: false }, // Disabled static profile; live ID-based detail below.
  { path: appPaths.rmSimInventory, element: <RegionalManagerInventoryPage />, title: "RM SIM Inventory", isSearchable: true },
  { path: "/sim-inventory/rm", element: <Navigate to={appPaths.rmSimInventory} replace />, title: "RM SIM Inventory", isSearchable: false },
  { path: "/dashboard/regional-manager/inventory", element: <Navigate to={appPaths.rmSimInventory} replace />, title: "RM SIM Inventory", isSearchable: false },
  { path: appPaths.rmRedistributeSims, element: <RegionalManagerInventoryPage initialModal="redistribute" />, title: "Redistribute SIMs", isSearchable: false },
  { path: "/dashboard/regional-manager/redistribute", element: <Navigate to={appPaths.rmRedistributeSims} replace />, title: "Redistribute SIMs", isSearchable: false },
  { path: appPaths.rmScDetails().format, element: <RegionalManagerCoordinatorPage />, title: "State Coordinator Details", isSearchable: false },
  { path: appPaths.stateCoordinatorDashboard, element: <StateCoordinatorDashboardPage />, title: "State Coordinator Dashboard", isSearchable: true },
  { path: appPaths.simActivation, element: <SimActivationPage />, title: "SIM Activation", isSearchable: true },
  { path: "/sim-activation", element: <SimActivationPage />, title: "SIM Activation", isSearchable: true },
  { path: appPaths.wallet, element: <UserWalletPage />, title: "My Wallet", isSearchable: true },
  { path: appPaths.scWallet, element: <ScWalletPage />, title: "SC Wallet", isSearchable: true },
  { path: appPaths.scSimInventory, element: <ScSimInventoryPage />, title: "SIM Inventory", isSearchable: true },
  { path: "/sim-inventory/sc", element: <Navigate to={appPaths.scSimInventory} replace />, title: "SC Inventory", isSearchable: false },
  { path: appPaths.scAgencyPartners, element: <ScAgencyPartnersPage />, title: "SC Agency Partners", isSearchable: true },
  { path: appPaths.scAgentDetail().format, element: <ScAgentDetailPage />, title: "SC Agency Partner Details", isSearchable: false },
  { path: "/sim-inventory", element: <Navigate to={appPaths.scSimInventory} replace />, title: "SIM Inventory Overview", isSearchable: false },
  { path: appPaths.scNetwork, element: <ScNetworkPage />, title: "Network Activity", isSearchable: true },
  { path: "/network", element: <ScNetworkPage />, title: "Network Activity", isSearchable: true },
  { path: appPaths.scActivationDetails().format, element: <ScActivationDetailsPage />, title: "Activation Details", isSearchable: true },
  { path: appPaths.scBonusTracker, element: <ScBonusTrackerPage />, title: "Bonus Tracker", isSearchable: true },
  { path: appPaths.scBonusHistory, element: <ScBonusHistoryPage />, title: "Bonus History", isSearchable: true },
  { path: appPaths.bonusTracking, element: <ScBonusTrackerPage />, title: "Bonus Tracker", isSearchable: true },
  { path: "/bonus", element: <ScBonusTrackerPage />, title: "Bonus Tracker", isSearchable: true },
];
