import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import RenewalMonitoringPage from "./pages/RenewalMonitoringPage";

export const renewalMonitoringRoutes: TRouteData[] = [
  { path: appPaths.renewalMonitoring, element: <RenewalMonitoringPage />, title: "Renewal Monitoring", isSearchable: true },
];
