import { useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { GetUserProfileApiResponse, UserProfileResponseData } from "../types/api";

export const QUERY_KEY_USER_PROFILE = ["user-profile"] as const;

export const getUserProfileApi = async (): Promise<GetUserProfileApiResponse> => {
  const response = await authedHttpClient.get<GetUserProfileApiResponse>(
    "/user/profile"
  );
  return response.data;
};

export const useGetUserProfile = (
  options?: Omit<
    UseQueryOptions<GetUserProfileApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const updateUser = useAuthStore((state) => state.updateUser);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);

  const query = useQuery({
    queryKey: QUERY_KEY_USER_PROFILE,
    queryFn: getUserProfileApi,
    staleTime: 1000 * 60 * 5, // 5 mins fresh
    ...options,
  });

  const responseData: UserProfileResponseData | undefined = query.data?.data;

  useEffect(() => {
    if (!responseData) return;

    if (responseData.user_profile) {
      updateUserProfile(responseData.user_profile);
    }

    updateUser({
      id: responseData.id,
      email: responseData.email,
      phone: responseData.phone,
      username: responseData.username,
      status: responseData.status,
      pin: responseData.pin,
      isProfileComplete: responseData.isProfileComplete,
      isVerified: responseData.isVerified,
      isCompany: responseData.isCompany,
      source: responseData.source,
      role: responseData.role,
    });
  }, [responseData, updateUser, updateUserProfile]);

  return {
    ...query,
    userData: responseData,
    profile: responseData?.user_profile,
    bankAccounts: responseData?.bank_accounts || [],
  };
};
