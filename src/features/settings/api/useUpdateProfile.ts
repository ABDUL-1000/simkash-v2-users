import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore } from "@/store/authStore";
import type { UpdateProfilePayload, UpdateProfileApiResponse } from "../types/api";

export const updateProfileApi = async (
  payload: UpdateProfilePayload
): Promise<UpdateProfileApiResponse> => {
  const response = await authedHttpClient.put<UpdateProfileApiResponse>(
    "/user/profile",
    payload
  );
  return response.data;
};

export const useUpdateProfile = (
  options?: UseMutationOptions<
    UpdateProfileApiResponse,
    Error,
    UpdateProfilePayload
  >
) => {
  const queryClient = useQueryClient();
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);

  return useMutation({
    ...options,
    mutationFn: updateProfileApi,
    onSuccess: (...args) => {
      const [data] = args;
      const profileData = (data?.data as any)?.user_profile || data?.data;
      if (profileData) {
        updateUserProfile(profileData);
      }
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });

      openNotification({
        state: "success",
        title: "Profile Updated",
        description: data?.message || "Your profile details have been saved.",
      });

      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Update Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not update profile information.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
