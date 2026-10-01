import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { BillServicesApiResponse, BillServiceItem } from "../types/api";

export const QUERY_KEY_CABLE_SERVICES = ["cable-services"] as const;

export const getCableServicesApi = async (): Promise<BillServicesApiResponse> => {
  const response = await authedHttpClient.get<BillServicesApiResponse>(
    "/user/billpayment/cable/service"
  );
  return response.data;
};

export const useGetCableServices = (
  options?: Omit<UseQueryOptions<BillServiceItem[], Error>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: QUERY_KEY_CABLE_SERVICES,
    queryFn: async () => (await getCableServicesApi()).data ?? [],
    staleTime: 1000 * 60 * 10,
    ...options,
  });

  const services: BillServiceItem[] = query.data ?? [];

  return {
    ...query,
    services,
  };
};
