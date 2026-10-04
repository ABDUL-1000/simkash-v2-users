import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getOrderDetail } from "./marketplaceApi";
export const useGetOrderDetail = (id?: number | string) => {
  const token = useAuthStore((s) => s.accessToken);
  const query = useQuery({ queryKey: ["marketplace-order-detail", id], queryFn: () => getOrderDetail(id!), enabled: Boolean(token && id), staleTime: 30_000 });
  return { ...query, order: query.data?.data };
};
