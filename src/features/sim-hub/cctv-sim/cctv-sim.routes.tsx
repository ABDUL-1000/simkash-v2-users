import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import CctvSimPage from "./pages/CctvSimPage";

export const cctvSimRoutes: TRouteData[] = [{ path: appPaths.cctvSim, element: <CctvSimPage />, title: "CCTV SIM", isSearchable: true }];
