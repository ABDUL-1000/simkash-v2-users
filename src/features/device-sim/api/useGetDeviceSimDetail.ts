import { useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";
import type { DeviceSimItem } from "../types/api";

export const useGetDeviceSimDetail = (type?: string, id?: string) => useQuery({
  queryKey: ["device-sim-detail", type, id],
  enabled: Boolean(type && id),
  queryFn: async () => (await authedHttpClient.get<ApiResponse<DeviceSimItem>>(`/user/device-sim/${encodeURIComponent(type!)}/${encodeURIComponent(id!)}`)).data.data,
});
