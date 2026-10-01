import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { appPaths } from "@/app/router/paths";
import type { ApiResponse, ResetPasswordPayload } from "../types/api";

export const resetPasswordApi = async (
  payload: ResetPasswordPayload
): Promise<ApiResponse<null>> => {
  const headers: Record<string, string> = {};
  const token =
    payload.token || sessionStorage.getItem("simkash_reset_token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await authedHttpClient.post<ApiResponse<null>>(
    "/user/auth/reset-password",
    payload,
    { headers }
  );
  return response.data;
};

export const useResetPassword = (
  options?: UseMutationOptions<
    ApiResponse<null>,
    Error,
    ResetPasswordPayload
  >
) => {
  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: resetPasswordApi,
    onSuccess: (...args) => {
      const [data] = args;
      sessionStorage.removeItem("simkash_reset_token");
      openNotification({
        state: "success",
        title: "Password Reset Successful",
        description: data?.message || "You can now sign in with your new password.",
      });
      navigate(appPaths.login, { replace: true });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Reset Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to reset password. Please try again.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
