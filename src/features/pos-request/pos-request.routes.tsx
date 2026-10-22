import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { PosRequestPage } from "./pages/PosRequestPage";

export const posRequestRoutes: TRouteData[] = [
  { path: appPaths.posRequest, element: <PosRequestPage />, title: "Request POS Machine", isSearchable: true },
];
