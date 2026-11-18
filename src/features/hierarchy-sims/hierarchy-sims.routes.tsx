import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SimRequestsPage from "./pages/SimRequestsPage";
import RecallSimsPage from "./pages/RecallSimsPage";

export const hierarchySimsRoutes: TRouteData[] = [
  { path: appPaths.simRequests, element: <SimRequestsPage />, title: "SIM Requests", isSearchable: true },
  { path: appPaths.recallSims, element: <RecallSimsPage />, title: "Recall SIMs", isSearchable: true },
];
