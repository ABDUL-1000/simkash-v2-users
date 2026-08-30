import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import ZeroLimitSimPage from "./pages/ZeroLimitSimPage";

export const ZeroLimitSimRoutes: TRouteData[] = [{ path: appPaths.zeroLimitSims, element: <ZeroLimitSimPage />, title: "Zero Limits Sims", isSearchable: true }];
