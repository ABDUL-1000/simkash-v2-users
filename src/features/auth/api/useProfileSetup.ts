import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore } from "@/store/authStore";
import { getDashboardRouteByRole } from "@/utils/auth/roleRouting";
import type { ApiResponse, ProfileSetupPayload } from "../types/api";

export const profileSetupApi = async (
  payload: ProfileSetupPayload
): Promise<ApiResponse<{ role?: string }>> => {
  const response = await authedHttpClient.post<ApiResponse<{ role?: string }>>(
    "/user/auth/profile-setup",
    payload
  );
  return response.data;
};

export const useProfileSetup = (
  options?: UseMutationOptions<
    ApiResponse<{ role?: string }>,
    Error,
    ProfileSetupPayload
  >
) => {
  const navigate = useNavigate();
  const updateUser = useAuthStore((state) => state.updateUser);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);

  return useMutation({
    ...options,
    mutationFn: profileSetupApi,
    onSuccess: (...args) => {
      const [data, variables] = args;
      // Mark profile complete in Zustand
      const role = data?.data?.role || user?.role || userProfile?.role || "USER";
      updateUser({ isProfileComplete: true, role });
      if (variables) {
        updateUserProfile({
          fullname: variables.fullname,
          gender: variables.gender,
          country: variables.country,
        });
      }

      openNotification({
        state: "success",
        title: "Setup Completed",
        description: data?.message || "Your profile and security PIN are ready.",
      });

      navigate(getDashboardRouteByRole(role), { replace: true });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Setup Failed",
        description:
          error.message ||
          "Unable to save profile setup. Please try again.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
