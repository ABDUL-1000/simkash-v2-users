import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  VerifyCustomerApiResponse,
  CableVerifyPayload,
} from "../types/api";

export const verifyCableCardApi = async (
  payload: CableVerifyPayload
): Promise<VerifyCustomerApiResponse> => {
  const response = await authedHttpClient.post<VerifyCustomerApiResponse>(
    "/user/billpayment/cable/verify",
    payload
  );
  return response.data;
};

export const useVerifyCableCard = (
  options?: UseMutationOptions<
    VerifyCustomerApiResponse,
    Error,
    CableVerifyPayload
  >
) => {
  return useMutation({
    ...options,
    mutationFn: verifyCableCardApi,
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "SmartCard Verification Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not verify SmartCard or IUC number.",
      });
      options?.onError?.(...args);
    },
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
