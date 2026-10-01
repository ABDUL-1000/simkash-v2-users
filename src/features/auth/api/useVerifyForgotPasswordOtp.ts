import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { appPaths } from "@/app/router/paths";
import type {
  ApiResponse,
  VerifyForgotPasswordPayload,
  ResetTokenResponseData,
} from "../types/api";

export const verifyForgotPasswordOtpApi = async (
  payload: VerifyForgotPasswordPayload
): Promise<ApiResponse<ResetTokenResponseData>> => {
  const response = await authedHttpClient.post<
    ApiResponse<ResetTokenResponseData>
  >("/user/auth/verify-forgot-password", payload);
  return response.data;
};

export const useVerifyForgotPasswordOtp = (
  options?: UseMutationOptions<
    ApiResponse<ResetTokenResponseData>,
    Error,
    VerifyForgotPasswordPayload
  >
) => {
  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: verifyForgotPasswordOtpApi,
    onSuccess: (...args) => {
      const [data, variables] = args;
      openNotification({
        state: "success",
        title: "Code Verified",
        description: "Please enter your new password.",
      });

      const resetToken =
        data?.data?.resetToken ||
        (data as any)?.resetToken ||
        (data?.data as any)?.token ||
        (data as any)?.token;
      if (resetToken) {
        sessionStorage.setItem("simkash_reset_token", resetToken);
      }

      navigate(appPaths.resetPassword, {
        state: { email: variables?.email, resetToken },
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Verification Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Invalid or expired reset code.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
