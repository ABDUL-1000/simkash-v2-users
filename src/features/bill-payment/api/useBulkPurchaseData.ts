import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  BulkPurchaseApiResponse,
  BulkDataPurchasePayload,
} from "../types/api";

export const bulkPurchaseDataApi = async (
  payload: BulkDataPurchasePayload
): Promise<BulkPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BulkPurchaseApiResponse>(
    "/user/billpayment/data/bulk/purchase",
    payload
  );
  return response.data;
};

export const useBulkPurchaseData = (
  options?: UseMutationOptions<
    BulkPurchaseApiResponse,
    Error,
    BulkDataPurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: bulkPurchaseDataApi,
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
        title: "Bulk Data Activated",
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
        title: "Bulk Data Purchase Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not process bulk data plan recharge.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
