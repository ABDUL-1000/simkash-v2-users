import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "@/app/router/paths";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "../types/api";

export const logoutUserApi = async (): Promise<ApiResponse<{ message: string }>> => {
  const response = await authedHttpClient.post<ApiResponse<{ message: string }>>(
    "/user/auth/logout"
  );
  return response.data;
};

export const useLogoutUser = (
  options?: UseMutationOptions<ApiResponse<{ message: string }>, Error, void>
) => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const client = useQueryClient();
  const finishLogout = async () => {
    // Stop profile requests before clearing auth so late responses cannot restore the session.
    await client.cancelQueries();
    clearAuth();
    client.removeQueries();
    navigate(appPaths.login, { replace: true });
  };

  return useMutation({
    ...options,
    mutationFn: logoutUserApi,
    onSuccess: async (...args) => {
      const [data] = args;
      await finishLogout();
      openNotification({
        state: "info",
        title: "Signed Out",
        description: data?.message || "Logged out successfully",
      });
      await options?.onSuccess?.(...args);
    },
    onError: async (...args) => {
      await finishLogout();
      await options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
