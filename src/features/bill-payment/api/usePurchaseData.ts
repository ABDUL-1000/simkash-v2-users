import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { BillPurchaseApiResponse, DataPurchasePayload } from "../types/api";

export const purchaseDataApi = async (
  payload: DataPurchasePayload
): Promise<BillPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BillPurchaseApiResponse>(
    "/user/billpayment/data/purchase",
    payload
  );
  return response.data;
};

export const usePurchaseData = (
  options?: UseMutationOptions<
    BillPurchaseApiResponse,
    Error,
    DataPurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: purchaseDataApi,
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
        title: "Data Bundle Activated",
        description: `Reference: ${data?.data?.reference || "Completed"} - Data sent to ${
          data?.data?.phone || ""
        }`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Data Purchase Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not complete data bundle activation.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
