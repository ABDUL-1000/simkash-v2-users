import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { PosSimPage } from "./gps-sim.lazy";

export const gpsSimRoutes: TRouteData[] = [{ path: appPaths.gpsSim, element: <PosSimPage />, title: "GPS SIM", isSearchable: true }];
