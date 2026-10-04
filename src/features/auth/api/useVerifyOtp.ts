import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "@/app/router/paths";
import { getDashboardRouteByRole } from "@/utils/auth/roleRouting";
import type { ApiResponse, VerifyOtpPayload, AuthResponseData } from "../types/api";

export const verifyOtpApi = async (
  payload: VerifyOtpPayload
): Promise<ApiResponse<AuthResponseData>> => {
  const response = await authedHttpClient.post<ApiResponse<AuthResponseData>>(
    "/user/auth/verify-otp",
    payload
  );
  return response.data;
};

export const useVerifyOtp = (
  options?: UseMutationOptions<
    ApiResponse<AuthResponseData>,
    Error,
    VerifyOtpPayload
  >
) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    ...options,
    mutationFn: verifyOtpApi,
    onSuccess: (...args) => {
      const [data] = args;
      openNotification({
        state: "success",
        title: "Verification Successful",
        description: data.message || "Your email has been verified.",
      });

      const resData = data.data;
      const token = resData?.accessToken || resData?.token;
      const user = resData?.user;

      if (token && user) {
        setAuth({
          accessToken: token,
          refreshToken: resData?.refreshToken,
          user,
          userProfile: resData?.userProfile,
          wallet: resData?.wallet,
        });

        // Onboarding Guard
        if (user && !user.isProfileComplete) {
          navigate(appPaths.profileSetup);
        } else {
          navigate(getDashboardRouteByRole(user?.role), { replace: true });
        }
      }

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Verification Failed",
        description:
          error.message ||
          "Invalid or expired OTP code.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
