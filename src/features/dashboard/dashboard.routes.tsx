import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { DashboardPage } from "./dashboard.lazy";
export const dashboardRoutes: TRouteData[] = [{ path: appPaths.dashboard, element: <DashboardPage />, title: "Overview", isSearchable: true }];
