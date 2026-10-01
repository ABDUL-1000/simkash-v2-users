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

export const purchaseJambPinApi = async (
  payload: EducationPurchasePayload
): Promise<BillPurchaseApiResponse> => {
  const response = await authedHttpClient.post<BillPurchaseApiResponse>(
    "/user/billpayment/education/jamb/purchase",
    payload
  );
  return response.data;
};

export const usePurchaseJambPin = (
  options?: UseMutationOptions<
    BillPurchaseApiResponse,
    Error,
    EducationPurchasePayload
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: purchaseJambPinApi,
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
        title: "JAMB e-PIN Generated Successfully",
        description: `Reference: ${data?.data?.reference || "Completed"} - Sent to ${
          data?.data?.phone || ""
        }`,
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "JAMB e-PIN Purchase Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not complete JAMB e-PIN generation.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
