import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useAuthStore, type UserState } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type { ChangePinPayload } from "../types/api";

export const changePinApi = async (
  payload: ChangePinPayload
): Promise<ApiResponse<UserState>> => {
  const response = await authedHttpClient.put<ApiResponse<UserState>>(
    "/user/pin",
    payload
  );
  return response.data;
};

export const useChangePin = (
  options?: UseMutationOptions<
    ApiResponse<UserState>,
    Error,
    ChangePinPayload
  >
) => {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    ...options,
    mutationFn: changePinApi,
    onSuccess: (...args) => {
      const [data] = args;
      if (data?.data) {
        updateUser(data.data);
      }
      openNotification({
        state: "success",
        title: "PIN Updated",
        description: data?.message || "PIN updated successfully",
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "PIN Change Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to update transaction PIN. Please try again.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
