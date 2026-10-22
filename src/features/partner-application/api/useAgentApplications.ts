import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { ApplicationOptions, ApplicationRole, ApplicationStatus, ApplicationSubmitResult, PartnerApplicationPayload, StateCoordinatorApplicationPayload } from "../types/api";

export const applicationKeys = { all: ["agent-applications"] as const };

async function get<T>(url: string, signal?: AbortSignal) {
  const { data } = await authedHttpClient.get<ApiResponse<T>>(url, { signal });
  if (!data.success) throw new Error(data.message);
  return data.data;
}

/** Roles (title, description, benefits, requirements), states and genders for the application form. */
export const useGetApplicationOptions = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({ queryKey: [...applicationKeys.all, "options"], queryFn: ({ signal }) => get<ApplicationOptions>("/user/apply/options", signal), enabled: Boolean(token), staleTime: 1000 * 60 * 30 });
};

/** Current user's Partner & State Coordinator applications. */
export const useGetApplicationStatus = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({ queryKey: [...applicationKeys.all, "status"], queryFn: ({ signal }) => get<ApplicationStatus>("/user/applications/status", signal), enabled: Boolean(token), staleTime: 1000 * 30 });
};

type Payloads = { partner: PartnerApplicationPayload; state: StateCoordinatorApplicationPayload };
const APPLY_PATHS: Record<ApplicationRole, string> = { partner: "/user/partner/apply", state: "/user/state-coordinator/apply" };

export function useSubmitApplication<R extends ApplicationRole>(role: R) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payloads[R]) => {
      const { data } = await authedHttpClient.post<ApiResponse<ApplicationSubmitResult>>(APPLY_PATHS[role], payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: response => {
      openNotification({ state: "success", title: "Application submitted", description: response.message });
      void client.invalidateQueries({ queryKey: applicationKeys.all });
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Application failed", description: error.message }),
  });
}
