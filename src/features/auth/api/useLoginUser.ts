import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore } from "@/store/authStore";
import { getDashboardRouteByRole } from "@/utils/auth/roleRouting";
import { appPaths } from "@/app/router/paths";
import type { ApiResponse, LoginPayload, AuthResponseData } from "../types/api";

export const loginUserApi = async (
  payload: LoginPayload
): Promise<ApiResponse<AuthResponseData>> => {
  const response = await authedHttpClient.post<ApiResponse<AuthResponseData>>(
    "/user/auth/login",
    payload
  );
  return response.data;
};

export const useLoginUser = (
  options?: UseMutationOptions<
    ApiResponse<AuthResponseData>,
    Error,
    LoginPayload
  >
) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    ...options,
    mutationFn: loginUserApi,
    onSuccess: (...args) => {
      const [data, variables] = args;
      openNotification({
        state: "success",
        title: "Welcome Back",
        description: data?.message || "Signed in successfully.",
      });

      const resData = (data as any)?.data || data;
      const token =
        resData?.accessToken ||
        resData?.token ||
        (data as any)?.accessToken ||
        (data as any)?.token;
      const user = resData?.user || (data as any)?.user;

      if (token) {
        const resolvedUser = user || {
          id: 1,
          email: variables?.phoneOrEmail || "user@simkash.ng",
          role: "USER",
          isProfileComplete: true,
          isVerified: true,
        };

        setAuth({
          accessToken: token,
          refreshToken: resData?.refreshToken,
          user: resolvedUser,
          userProfile: resData?.userProfile,
          wallet: resData?.wallet,
        });

        // Universal Onboarding Check
        if (resolvedUser && !resolvedUser.isProfileComplete) {
          navigate(appPaths.profileSetup);
        } else {
          const role =
            resData?.userProfile?.role || resolvedUser?.role || "USER";
          navigate(getDashboardRouteByRole(role), { replace: true });
        }
      } else {
        navigate(appPaths.dashboard, { replace: true });
      }

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Sign In Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Invalid credentials. Please try again.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};