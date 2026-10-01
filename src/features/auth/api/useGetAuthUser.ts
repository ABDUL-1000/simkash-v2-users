import { useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "@/app/router/paths";
import type { ApiResponse, AuthMeResponseData } from "../types/api";

export const QUERY_KEY_AUTH_USER = ["auth-me"] as const;

export const getAuthUserApi = async (): Promise<ApiResponse<AuthMeResponseData>> => {
  const response = await authedHttpClient.get<ApiResponse<AuthMeResponseData>>(
    "/user/auth/me"
  );
  return response.data;
};

export const useGetAuthUser = (
  options?: Omit<
    UseQueryOptions<ApiResponse<AuthMeResponseData>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);

  const query = useQuery({
    queryKey: QUERY_KEY_AUTH_USER,
    queryFn: getAuthUserApi,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    ...options,
  });

  const responseData = query.data?.data;
  const user = responseData?.userDetails || (responseData as any)?.user;
  const profile = responseData?.userProfile;
  const wallet = responseData?.wallet;
  const role =
    responseData?.role || profile?.role || user?.role || "USER";

  useEffect(() => {
    if (!responseData || !accessToken || !user) return;

    // 1. Sync store state with live user data
    setAuth({
      accessToken,
      user,
      userProfile: profile,
      wallet,
    });

    // 2. Universal onboarding check
    if (user.isProfileComplete === false) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/auth/")
      ) {
        navigate(appPaths.profileSetup, { replace: true });
      }
    }
  }, [responseData, user, profile, wallet, accessToken, setAuth, navigate]);

  return {
    ...query,
    user,
    profile,
    wallet,
    role,
  };
};
