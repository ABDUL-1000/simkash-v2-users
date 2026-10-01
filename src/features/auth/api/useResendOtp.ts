import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse, ResendOtpPayload } from "../types/api";

export const resendOtpApi = async (
  payload: ResendOtpPayload
): Promise<ApiResponse<null>> => {
  const response = await authedHttpClient.post<ApiResponse<null>>(
    "/user/auth/resend-otp",
    payload
  );
  return response.data;
};

export const useResendOtp = (
  options?: UseMutationOptions<
    ApiResponse<null>,
    Error,
    ResendOtpPayload
  >
) => {
  return useMutation({
    ...options,
    mutationFn: resendOtpApi,
    onSuccess: (...args) => {
      const [data] = args;
      openNotification({
        state: "success",
        title: "OTP Resent",
        description: data.message || "OTP has been successfully resent",
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Failed to Resend OTP",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to resend OTP at this time.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
