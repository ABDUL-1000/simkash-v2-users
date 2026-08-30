import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SimSwapPage from "./pages/SimSwapPage";

export const SimSwapRoutes: TRouteData[] = [{ path: appPaths.simSwaps, element: <SimSwapPage />, title: "SIM Swaps", isSearchable: true }];
