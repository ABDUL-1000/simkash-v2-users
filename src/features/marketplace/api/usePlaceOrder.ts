import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { PlaceOrderPayload, PlaceOrderResponseData } from "../types/api";

type PlaceOrderResponse = ApiResponse<PlaceOrderResponseData>;
export const usePlaceOrder = (options?: UseMutationOptions<PlaceOrderResponse, Error, PlaceOrderPayload>) => {
  const client = useQueryClient();
  return useMutation<PlaceOrderResponse, Error, PlaceOrderPayload>({
    ...options,
    mutationFn: async (payload) => (await authedHttpClient.post<PlaceOrderResponse>("/marketplace/orders", payload)).data,
    onSuccess: (...args) => {
      void client.invalidateQueries({ queryKey: ["marketplace-overview"] });
      void client.invalidateQueries({ queryKey: ["marketplace-orders"] });
      void client.invalidateQueries({ queryKey: ["user-wallet"] });
      void client.invalidateQueries({ queryKey: ["user-wallet-balance"] });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Order failed", description: args[0].message || "Could not place your order." });
      options?.onError?.(...args);
    },
  });
};
