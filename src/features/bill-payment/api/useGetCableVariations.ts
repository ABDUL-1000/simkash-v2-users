import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ServiceVariationsApiResponse, ServiceVariationItem } from "../types/api";

export const getCableVariationsApi = async (
  serviceID: string
): Promise<ServiceVariationsApiResponse> => {
  const response = await authedHttpClient.get<ServiceVariationsApiResponse>(
    `/user/billpayment/cable/variation?serviceID=${encodeURIComponent(serviceID)}`
  );
  return response.data;
};

export const useGetCableVariations = (
  serviceID?: string,
  options?: Omit<
    UseQueryOptions<ServiceVariationItem[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  const query = useQuery({
    queryKey: ["cable-variations", serviceID] as const,
    queryFn: async () => {
      const raw = (await getCableVariationsApi(serviceID!)).data;
      return raw?.variations || raw?.varations || [];
    },
    enabled: Boolean(serviceID),
    staleTime: 1000 * 60 * 10,
    ...options,
  });

  const variations: ServiceVariationItem[] = query.data ?? [];

  return {
    ...query,
    variations,
  };
};
