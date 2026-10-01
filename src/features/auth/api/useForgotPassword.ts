import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { appPaths } from "@/app/router/paths";
import type { ApiResponse, ForgotPasswordPayload } from "../types/api";

export const forgotPasswordApi = async (
  payload: ForgotPasswordPayload
): Promise<ApiResponse<null>> => {
  const response = await authedHttpClient.post<ApiResponse<null>>(
    "/user/auth/forgot-password",
    payload
  );
  return response.data;
};

export const useForgotPassword = (
  options?: UseMutationOptions<
    ApiResponse<null>,
    Error,
    ForgotPasswordPayload
  >
) => {
  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: forgotPasswordApi,
    onSuccess: (...args) => {
      const [data, variables] = args;
      openNotification({
        state: "success",
        title: "Reset Code Sent",
        description: data?.message || "Verification code sent to your email.",
      });
      navigate(appPaths.verifyEmailOtp, {
        state: { email: variables?.email, mode: "forgot-password" },
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Request Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to send reset instructions.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
