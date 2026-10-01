import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
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

  return useMutation({
    ...options,
    mutationFn: logoutUserApi,
    onSuccess: (...args) => {
      const [data] = args;
      clearAuth();
      openNotification({
        state: "info",
        title: "Signed Out",
        description: data?.message || "Logged out successfully",
      });
      navigate(appPaths.login, { replace: true });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      clearAuth();
      navigate(appPaths.login, { replace: true });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
