import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import InstallersPage from "./pages/InstallersPage";
import InstallersDetailsPage from "./pages/InstallersDetailsPage";
import JobPoolPage from "./pages/JobPoolPage";

export const InstallerRoutes: TRouteData[] = [
  { path: appPaths.installers, element: <InstallersPage />, title: "Installers", isSearchable: true },
  { path: appPaths.installerDetails().format, element: <InstallersDetailsPage />, title: "Installers Details", isSearchable: false },
  { path: appPaths.jobPool, element: <JobPoolPage />, title: "Job Pool", isSearchable: true },
];
