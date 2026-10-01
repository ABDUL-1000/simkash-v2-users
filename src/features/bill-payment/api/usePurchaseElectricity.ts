import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  BillPurchaseApiResponse,
  ElectricityPurchasePayload,
} from "../types/api";

export const purchaseElectricityApi = async (
  payload: ElectricityPurchasePayload
): Promise<BillPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BillPurchaseApiResponse>(
    "/user/billpayment/electricity/purchase",
    payload
  );
  return response.data;
};

export const usePurchaseElectricity = (
  options?: UseMutationOptions<
    BillPurchaseApiResponse,
    Error,
    ElectricityPurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: purchaseElectricityApi,
    onSuccess: (...args) => {
      const [data] = args;
      queryClient.invalidateQueries({ queryKey: ["user-wallet"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet-summary"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bill-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });

      const token = data?.data?.token || data?.data?.purchased_code;

      openNotification({
        state: "success",
        title: "Electricity Payment Successful",
        description: token
          ? `Token: ${token} - Meter: ${data?.data?.phone || ""}`
          : `Reference: ${data?.data?.reference || "Completed"}`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Electricity Purchase Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not process electricity payment.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
