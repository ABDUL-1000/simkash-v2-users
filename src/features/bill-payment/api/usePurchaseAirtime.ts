import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  BillPurchaseApiResponse,
  AirtimePurchasePayload,
} from "../types/api";

export const purchaseAirtimeApi = async (
  payload: AirtimePurchasePayload
): Promise<BillPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BillPurchaseApiResponse>(
    "/user/billpayment/airtime/purchase",
    payload
  );
  return response.data;
};

export const usePurchaseAirtime = (
  options?: UseMutationOptions<
    BillPurchaseApiResponse,
    Error,
    AirtimePurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: purchaseAirtimeApi,
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
        title: "Airtime Recharged Successfully",
        description: `Reference: ${data?.data?.reference || "Completed"} - ₦${
          data?.data?.amount || ""
        } sent to ${data?.data?.phone || ""}`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Airtime Purchase Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to complete airtime recharge.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
