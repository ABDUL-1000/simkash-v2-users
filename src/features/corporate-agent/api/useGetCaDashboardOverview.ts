import { useCaQuery } from "./client";
import type { CaDashboardOverviewData } from "../types/api";
export const useGetCaDashboardOverview = () => useCaQuery<CaDashboardOverviewData>("ca-dashboard-overview", "/overview");
