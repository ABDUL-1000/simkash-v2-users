import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SimSearchPage from "./pages/SimSearchPage";
import SimDetailsPage from "./pages/SimDetailsPage";

export const SimSearchRoutes: TRouteData[] = [{ path: appPaths.adminSimSearch, element: <SimSearchPage />, title: "Admin SIM Search", isSearchable: true },
      { path: appPaths.adminSimSearchDetails().format, element: <SimDetailsPage />, title: "SIM Search Details", isSearchable: false },

];
