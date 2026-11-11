import { Navigate } from "react-router-dom";
import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import InstallerDashboardPage from "./pages/InstallerDashboardPage";
import InstallerWalletPage from "./pages/InstallerWalletPage";
import ActiveJobsPage from "./jobs/pages/ActiveJobsPage";
import JobDetailsPage from "./jobs/pages/JobDetailsPage";
import PendingVerificationPage from "./jobs/pages/PendingVerificationPage";
import DisputedJobsPage from "./jobs/pages/DisputedJobsPage";
import CompletedJobsPage from "./jobs/pages/CompletedJobsPage";

/** Installer app (/installer/*). `/installer/jobs/:jobId` is the deep link used by notification emails. */
export const installerRoutes: TRouteData[] = [
  { path: appPaths.installerDashboard, element: <InstallerDashboardPage />, title: "Installer Dashboard", isSearchable: true },
  { path: "/installer", element: <Navigate to={appPaths.installerDashboard} replace />, title: "Installer", isSearchable: false },
  { path: appPaths.installerJobs, element: <ActiveJobsPage />, title: "My Jobs", isSearchable: true },
  { path: appPaths.installerJobsActive, element: <Navigate to={appPaths.installerJobs} replace />, title: "My Jobs", isSearchable: false },
  { path: appPaths.installerJobsPending, element: <PendingVerificationPage />, title: "Pending Verification", isSearchable: true },
  { path: appPaths.installerJobsDisputed, element: <DisputedJobsPage />, title: "Disputes", isSearchable: true },
  { path: appPaths.installerJobsCompleted, element: <CompletedJobsPage />, title: "Completed Jobs & Reviews", isSearchable: true },
  { path: appPaths.installerEarnings, element: <InstallerWalletPage />, title: "Earnings & Payout", isSearchable: true },
  { path: appPaths.installerJobDetails().format, element: <JobDetailsPage />, title: "Job Details", isSearchable: false },
];
