import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getProductDetail } from "./marketplaceApi";
export const useGetProductDetail = (id?: number | string) => {
  const token = useAuthStore((s) => s.accessToken);
  const query = useQuery({ queryKey: ["marketplace-product-detail", id], queryFn: () => getProductDetail(id!), enabled: Boolean(token && id), staleTime: 60_000 });
  return { ...query, product: query.data?.data };
};
