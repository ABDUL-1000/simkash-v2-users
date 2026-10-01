import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type {
  VerifyCustomerApiResponse,
  EducationVerifyPayload,
} from "../types/api";

export const verifyJambProfileApi = async (
  payload: EducationVerifyPayload
): Promise<VerifyCustomerApiResponse> => {
  const response = await authedHttpClient.post<VerifyCustomerApiResponse>(
    "/user/billpayment/education/jamb/verify",
    payload
  );
  return response.data;
};

export const useVerifyJambProfile = (
  options?: UseMutationOptions<
    VerifyCustomerApiResponse,
    Error,
    EducationVerifyPayload
  >
) => {
  return useMutation({
    ...options,
    mutationFn: verifyJambProfileApi,
    onError: (...args) => {
      const [error] = args;
      openNotification({
        state: "error",
        title: "JAMB Profile Verification Failed",
        description:
          (error as any)?.response?.data?.message ||
          error.message ||
          "Could not verify JAMB Profile Code with the portal.",
      });
      options?.onError?.(...args);
    },
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
