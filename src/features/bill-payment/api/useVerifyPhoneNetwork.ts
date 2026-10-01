import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  VerifyPhoneNetworkApiResponse,
  VerifyPhoneNetworkPayload,
} from "../types/api";

export const verifyPhoneNetworkApi = async (
  payload: VerifyPhoneNetworkPayload
): Promise<VerifyPhoneNetworkApiResponse> => {
  const response = await authedHttpClient.post<VerifyPhoneNetworkApiResponse>(
    "/user/billpayment/airtime/verify",
    payload
  );
  return response.data;
};

export const useVerifyPhoneNetwork = (
  options?: UseMutationOptions<
    VerifyPhoneNetworkApiResponse,
    Error,
    VerifyPhoneNetworkPayload
  >
) => {
  return useMutation({
    ...options,
    mutationFn: verifyPhoneNetworkApi,
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Network Detection Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not detect mobile network provider.",
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
