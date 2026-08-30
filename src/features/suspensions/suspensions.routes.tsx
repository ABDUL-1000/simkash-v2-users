import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SuspensionPage from "./pages/SuspensionPage";
import SuspensionDetailsPage from "./pages/SuspensionDetailsPage";

export const SuspensionRoutes: TRouteData[] = [
  { path: appPaths.suspensions, element: <SuspensionPage />, title: "Account Suspensions", isSearchable: true },
  { path: appPaths.suspensionDetails().format, element: <SuspensionDetailsPage />, title: "Suspension Details", isSearchable: false },
];
