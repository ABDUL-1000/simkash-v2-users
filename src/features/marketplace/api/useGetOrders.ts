import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getOrders } from "./marketplaceApi";
export interface GetOrdersParams { page: number; limit: number; status?: string; paymentStatus?: string; }
export const useGetOrders = (params: GetOrdersParams) => {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({ queryKey: ["marketplace-orders", params], queryFn: () => getOrders(params), enabled: Boolean(token), staleTime: 60_000 });
};
