import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore } from "@/store/authStore";
import { getDashboardRouteByRole } from "@/utils/auth/roleRouting";
import { appPaths } from "@/app/router/paths";
import type { ApiResponse, LoginPayload, AuthResponseData } from "../types/api";

export const loginUserApi = async (payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> => {
  const { data } = await authedHttpClient.post<ApiResponse<AuthResponseData>>("/user/auth/login", payload);
  if (!data.success || !(data.data?.accessToken || data.data?.token) || !data.data?.user?.id || !data.data.user.role) {
    throw new Error(data.message && !data.success ? data.message : "Login response is missing account details. Please sign in again.");
  }
  return data;
};

export const useLoginUser = (options?: UseMutationOptions<ApiResponse<AuthResponseData>, Error, LoginPayload>) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const setAuth = useAuthStore(state => state.setAuth);
  return useMutation({
    ...options,
    mutationFn: loginUserApi,
    onSuccess: async (...args) => {
      const [response] = args;
      const data = response.data;
      // Cancel and remove the previous account's data before publishing the new session.
      await client.cancelQueries();
      client.removeQueries();
      setAuth({ accessToken: data.accessToken || data.token!, refreshToken: data.refreshToken, user: data.user, userProfile: data.userProfile, wallet: data.wallet });
      openNotification({ state: "success", title: "Welcome Back", description: response.message || "Signed in successfully." });
      navigate(data.user.isProfileComplete === false ? appPaths.profileSetup : getDashboardRouteByRole(data.user.role), { replace: true });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Sign In Failed", description: args[0].message || "Invalid credentials. Please try again." });
      return options?.onError?.(...args);
    },
  });
};
