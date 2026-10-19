import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getWalletTransactionsApi } from "./useGetWalletTransactions";
import type { WalletTransactionItem } from "../types/api";

const PAGE_SIZE = 100;
const MAX_PAGES = 10;

/**
 * Every wallet transaction since the start of the current month.
 * The transactions endpoint has no date filter, so pages (newest first) are read until one reaches last month.
 */
export const useGetWalletMonthTransactions = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const query = useQuery({
    queryKey: ["user-wallet-transactions", "this-month"],
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60,
    queryFn: async () => {
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
      const items: WalletTransactionItem[] = [];
      for (let page = 1; page <= MAX_PAGES; page++) {
        const response = await getWalletTransactionsApi({ page, limit: PAGE_SIZE });
        if (!response.success) throw new Error(response.message);
        const batch = response.data?.transactions ?? [];
        items.push(...batch.filter(tx => new Date(tx.createdAt).getTime() >= monthStart));
        const reachedOlder = batch.some(tx => new Date(tx.createdAt).getTime() < monthStart);
        if (reachedOlder || page >= (response.data?.pagination?.totalPages ?? 1) || batch.length < PAGE_SIZE) return { items, complete: true };
      }
      return { items, complete: false };
    },
  });
  return { ...query, transactions: query.data?.items ?? [], complete: query.data?.complete ?? true };
};
