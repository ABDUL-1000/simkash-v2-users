import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { DataPlansApiResponse, DataPlanItem } from "../types/api";

export const getDataPlansApi = async (
  serviceID: string
): Promise<DataPlansApiResponse> => {
  const response = await authedHttpClient.get<DataPlansApiResponse>(
    `/user/billpayment/data/plans?serviceID=${encodeURIComponent(serviceID)}`
  );
  return response.data;
};

export const useGetDataPlans = (
  serviceID?: string,
  options?: Omit<UseQueryOptions<DataPlanItem[], Error>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: ["data-plans", serviceID] as const,
    queryFn: async () => {
      const raw = (await getDataPlansApi(serviceID!)).data;
      return raw?.variations || raw?.varations || [];
    },
    enabled: Boolean(serviceID),
    staleTime: 1000 * 60 * 15,
    ...options,
  });

  const plans: DataPlanItem[] = query.data ?? [];

  return {
    ...query,
    plans,
  };
};
