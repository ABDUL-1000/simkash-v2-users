import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { CancelOrderResponseData } from "../types/api";

type CancelResponse = ApiResponse<CancelOrderResponseData>;
export const useCancelOrder = (options?: UseMutationOptions<CancelResponse, Error, number | string>) => {
  const client = useQueryClient();
  return useMutation<CancelResponse, Error, number | string>({
    ...options,
    mutationFn: async (id) => (await authedHttpClient.post<CancelResponse>(`/marketplace/orders/${encodeURIComponent(String(id))}/cancel`)).data,
    onSuccess: (...args) => {
      const [, id] = args;
      openNotification({ state: "success", title: "Order cancelled", description: "Your refund will be processed to your wallet." });
      void client.invalidateQueries({ queryKey: ["marketplace-orders"] });
      void client.invalidateQueries({ queryKey: ["marketplace-order-detail", id] });
      void client.invalidateQueries({ queryKey: ["user-wallet"] });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Cancellation failed", description: args[0].message || "Could not cancel this order." });
      options?.onError?.(...args);
    },
  });
};
