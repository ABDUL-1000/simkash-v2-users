import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { SimRecordPage } from "./sim-record.lazy";

export const SimRecordRoutes: TRouteData[] = [{ path: appPaths.simRecords, element: <SimRecordPage />, title: "SIM Records", isSearchable: true }];
