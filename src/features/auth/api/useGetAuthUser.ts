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
  const storedUser = useAuthStore(state => state.user);
  const storedProfile = useAuthStore(state => state.userProfile);
  const storedWallet = useAuthStore(state => state.wallet);
  const refreshToken = useAuthStore(state => state.refreshToken);

  const query = useQuery({
    queryKey: [...QUERY_KEY_AUTH_USER, storedUser?.id],
    queryFn: getAuthUserApi,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    ...options,
  });

  const responseData = query.data?.data;
  const responseUser = responseData?.userDetails || responseData?.user;
  const user = responseUser || storedUser;
  const profile = responseData?.userProfile || storedProfile;
  const wallet = responseData?.wallet || storedWallet;
  const role = user?.role || responseData?.role || profile?.role;

  useEffect(() => {
    if (!responseData || !accessToken || !responseUser || responseUser.id !== storedUser?.id) return;

    // 1. Sync store state with live user data
    setAuth({
      accessToken,
      refreshToken: refreshToken ?? undefined,
      user: { ...responseUser, role: responseUser.role || responseData.role || storedUser.role },
      userProfile: responseData.userProfile,
      wallet: responseData.wallet,
    });

    // 2. Universal onboarding check
    if (responseUser.isProfileComplete === false) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/auth/")
      ) {
        navigate(appPaths.profileSetup, { replace: true });
      }
    }
  }, [responseData, responseUser, storedUser?.id, storedUser?.role, refreshToken, accessToken, setAuth, navigate]);

  return {
    ...query,
    user,
    profile,
    wallet,
    role,
  };
};
