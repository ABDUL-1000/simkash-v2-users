import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  VerifyCustomerApiResponse,
  ElectricityVerifyPayload,
} from "../types/api";

export const verifyMeterApi = async (
  payload: ElectricityVerifyPayload
): Promise<VerifyCustomerApiResponse> => {
  const response = await authedHttpClient.post<VerifyCustomerApiResponse>(
    "/user/billpayment/electricity/verify",
    payload
  );
  return response.data;
};

export const useVerifyMeter = (
  options?: UseMutationOptions<
    VerifyCustomerApiResponse,
    Error,
    ElectricityVerifyPayload
  >
) => {
  return useMutation({
    ...options,
    mutationFn: verifyMeterApi,
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Meter Verification Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not verify meter number with DisCo.",
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
