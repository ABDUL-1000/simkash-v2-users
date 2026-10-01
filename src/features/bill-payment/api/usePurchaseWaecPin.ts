import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  BillPurchaseApiResponse,
  EducationPurchasePayload,
} from "../types/api";

export const purchaseWaecPinApi = async (
  payload: EducationPurchasePayload
): Promise<BillPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BillPurchaseApiResponse>(
    "/user/billpayment/education/waec/purchase",
    payload
  );
  return response.data;
};

export const usePurchaseWaecPin = (
  options?: UseMutationOptions<
    BillPurchaseApiResponse,
    Error,
    EducationPurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: purchaseWaecPinApi,
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
        title: "WAEC Scratch Card Generated",
        description: `Reference: ${data?.data?.reference || "Completed"} - PIN delivered to ${
          data?.data?.phone || ""
        }`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "WAEC Pin Purchase Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not purchase WAEC scratch card.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
