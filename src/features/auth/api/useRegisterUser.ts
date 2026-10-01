import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse, RegisterPayload } from "../types/api";

export const registerUserApi = async (
  payload: RegisterPayload
): Promise<ApiResponse<{ email: string }>> => {
  const response = await authedHttpClient.post<ApiResponse<{ email: string }>>(
    "/user/auth/register",
    payload
  );
  return response.data;
};

export const useRegisterUser = (
  options?: UseMutationOptions<ApiResponse<{ email: string }>, Error, RegisterPayload>
) => {
  return useMutation({
    ...options,
    mutationFn: registerUserApi,
    onSuccess: (...args) => {
      const [data] = args;
      openNotification({
        state: "success",
        title: "Registration Successful",
        description: data.message || "OTP has been successfully sent",
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "Registration Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Unable to register your account.",
      });
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
