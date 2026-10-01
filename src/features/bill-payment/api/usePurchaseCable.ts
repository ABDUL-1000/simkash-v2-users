import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  BillPurchaseApiResponse,
  CablePurchasePayload,
} from "../types/api";

export const purchaseCableApi = async (
  payload: CablePurchasePayload
): Promise<BillPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BillPurchaseApiResponse>(
    "/user/billpayment/cable/purchase",
    payload
  );
  return response.data;
};

export const usePurchaseCable = (
  options?: UseMutationOptions<
    BillPurchaseApiResponse,
    Error,
    CablePurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: purchaseCableApi,
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
        title: "Cable TV Subscription Successful",
        description: `Reference: ${data?.data?.reference || "Completed"} - ${
          data?.data?.packageName || "Package activated"
        }`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Subscription Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not process cable subscription.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
