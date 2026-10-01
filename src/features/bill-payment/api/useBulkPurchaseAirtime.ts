import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  BulkPurchaseApiResponse,
  BulkAirtimePurchasePayload,
} from "../types/api";

export const bulkPurchaseAirtimeApi = async (
  payload: BulkAirtimePurchasePayload
): Promise<BulkPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BulkPurchaseApiResponse>(
    "/user/billpayment/airtime/bulk/purchase",
    payload
  );
  return response.data;
};

export const useBulkPurchaseAirtime = (
  options?: UseMutationOptions<
    BulkPurchaseApiResponse,
    Error,
    BulkAirtimePurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: bulkPurchaseAirtimeApi,
    onSuccess: (...args) => {
      const [data] = args;
      queryClient.invalidateQueries({ queryKey: ["user-wallet"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet-summary"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bill-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });

      openNotification({
        state: "success",
        title: "Bulk Airtime Dispatched",
        description:
          data?.message ||
          `Batch Reference: ${data?.data?.reference || "Completed"}`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Bulk Airtime Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not process bulk airtime recharge.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
