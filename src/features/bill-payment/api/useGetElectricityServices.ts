import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { BillServicesApiResponse, BillServiceItem } from "../types/api";

export const QUERY_KEY_ELECTRICITY_SERVICES = ["electricity-services"] as const;

export const getElectricityServicesApi = async (): Promise<BillServicesApiResponse> => {
  const response = await authedHttpClient.get<BillServicesApiResponse>(
    "/user/billpayment/electricity/service"
  );
  return response.data;
};

export const useGetElectricityServices = (
  options?: Omit<
    UseQueryOptions<BillServiceItem[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  const query = useQuery({
    queryKey: QUERY_KEY_ELECTRICITY_SERVICES,
    queryFn: async () => (await getElectricityServicesApi()).data ?? [],
    staleTime: 1000 * 60 * 10,
    ...options,
  });

  const services: BillServiceItem[] = query.data ?? [];

  return {
    ...query,
    services,
  };
};
