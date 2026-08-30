import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { PosSimPage } from "./pos-sim.lazy";

export const posSimRoutes: TRouteData[] = [{ path: appPaths.posSim, element: <PosSimPage />, title: "POS Sim", isSearchable: true }];
