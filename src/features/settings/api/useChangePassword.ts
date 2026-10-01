import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore, type UserState } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type { ChangePasswordPayload } from "../types/api";

export const changePasswordApi = async (
  payload: ChangePasswordPayload
): Promise<ApiResponse<UserState>> => {
  const response = await authedHttpClient.put<ApiResponse<UserState>>(
    "/user/password",
    payload
  );
  return response.data;
};

export const useChangePassword = (
  options?: UseMutationOptions<
    ApiResponse<UserState>,
    Error,
    ChangePasswordPayload
  >
) => {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    ...options,
    mutationFn: changePasswordApi,
    onSuccess: (...args) => {
      const [data] = args;
      if (data?.data) {
        updateUser(data.data);
      }
      openNotification({
        state: "success",
        title: "Password Changed",
        description: data?.message || "Password updated successfully",
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Password Change Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to change your password. Please try again.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
