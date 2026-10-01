import { useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";
import type { DeviceSimFilters, DeviceSimListResponseData } from "../types/api";

export const useGetDeviceSims = ({ page, limit, network, status }: DeviceSimFilters) => useQuery({
  queryKey: ["device-sim-list", { page, limit, network, status }],
  queryFn: async () => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (network && network !== "All") params.set("network", network);
    if (status && status !== "All") params.set("status", status.toLowerCase());
    return (await authedHttpClient.get<ApiResponse<DeviceSimListResponseData>>(`/user/device-sim?${params}`)).data.data;
  },
});
