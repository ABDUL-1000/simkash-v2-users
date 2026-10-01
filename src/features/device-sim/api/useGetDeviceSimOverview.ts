import { useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";
import type { DeviceSimOverviewData } from "../types/api";

export const useGetDeviceSimOverview = () => useQuery({
  queryKey: ["device-sim-overview"],
  queryFn: async () => (await authedHttpClient.get<ApiResponse<DeviceSimOverviewData>>("/user/device-sim/overview")).data.data,
});
