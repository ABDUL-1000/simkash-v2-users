import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "@/app/router/paths";
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

      const resData = (data as any)?.data || data;
      const token =
        resData?.accessToken ||
        resData?.token ||
        (data as any)?.accessToken ||
        (data as any)?.token;
      const user = resData?.user || (data as any)?.user;

      if (token) {
        setAuth({
          accessToken: token,
          refreshToken: resData?.refreshToken,
          user: user || {
            id: 1,
            email: "user@simkash.ng",
            role: "USER",
            isProfileComplete: false,
            isVerified: true,
          },
          userProfile: resData?.userProfile,
          wallet: resData?.wallet,
        });

        // Onboarding Guard
        if (user && !user.isProfileComplete) {
          navigate(appPaths.profileSetup);
        } else {
          navigate(appPaths.dashboard);
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
          (error as any)?.response?.data?.message ||
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
