import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { DepositPayload, DepositResponseData } from "../types/api";

export const depositWalletApi = async (
  payload: DepositPayload
): Promise<ApiResponse<DepositResponseData>> => {
  const response = await authedHttpClient.post<ApiResponse<DepositResponseData>>(
    "/user/payment/deposit",
    payload
  );
  return response.data;
};

export const useDepositWallet = (
  options?: UseMutationOptions<ApiResponse<DepositResponseData>, Error, DepositPayload>
) => useMutation({
  ...options,
  mutationFn: depositWalletApi,
  onError: (...args) => {
    const [error] = args;
    const message = (error as Error & { response?: { data?: { message?: string } } })
      ?.response?.data?.message || error.message || "Could not initialize OPay checkout. Please try again.";
    openNotification({ state: "error", title: "Deposit Initialization Failed", description: message });
    options?.onError?.(...args);
  },
  onSuccess: (...args) => options?.onSuccess?.(...args),
  onSettled: (...args) => options?.onSettled?.(...args),
});
