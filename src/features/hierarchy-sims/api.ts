import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import { useHierarchyConfig } from "./roles";
import type {
  ApproveSimRequestPayload, AvailableSimsData, CreateSimRequestPayload, LeaderboardData, LeaderboardPeriod, Pagination, RecallHolder, RecallHoldersData,
  RecallPayload, RecallResult, RecallableSimsData, SimRequest, SimRequestList, SimRequestQuery, SimSuppliersData, SimType,
} from "./types";

/** Calls the API and unwraps `{ success, message, data }`; throws the server's (readable) message on failure. */
async function call<T>(method: "get" | "post" | "patch", url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = method === "get"
    ? await authedHttpClient.get<ApiResponse<T>>(url, { params: body, signal })
    : await authedHttpClient[method]<ApiResponse<T>>(url, body ?? {}, { signal });
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}

const emptyPagination = (n: number): Pagination => ({ total: n, page: 1, limit: n, totalPages: 1, hasNextPage: false, hasPrevPage: false });
const normaliseList = (raw: Partial<SimRequestList> | null | undefined): SimRequestList => {
  const requests = raw?.requests ?? [];
  return {
    requests,
    counts: { all: 0, PENDING: 0, APPROVED: 0, REJECTED: 0, CANCELLED: 0, ...raw?.counts },
    pagination: raw?.pagination ?? emptyPagination(requests.length),
  };
};

export const hsKeys = {
  all: ["hierarchy-sims"] as const,
  leaderboard: (role: string, period: LeaderboardPeriod) => ["hierarchy-sims", "leaderboard", role, period] as const,
  suppliers: (role: string) => ["hierarchy-sims", "suppliers", role] as const,
  mine: (role: string, q: SimRequestQuery) => ["hierarchy-sims", "mine", role, q] as const,
  incoming: (role: string, q: SimRequestQuery) => ["hierarchy-sims", "incoming", role, q] as const,
  available: (role: string, q: object) => ["hierarchy-sims", "available", role, q] as const,
  holders: (role: string, type?: SimType) => ["hierarchy-sims", "recall-holders", role, type ?? "all"] as const,
  holderSims: (role: string, id: number | string, q: object) => ["hierarchy-sims", "recall-sims", role, String(id), q] as const,
};

const useReady = () => Boolean(useAuthStore((s) => s.accessToken));
const queryParams = (q: SimRequestQuery) => ({ status: q.status, page: q.page, limit: q.limit, ...(q.sim_type ? { sim_type: q.sim_type } : {}) });

// ===================== Leaderboard =====================
export function useLeaderboard(period: LeaderboardPeriod) {
  const config = useHierarchyConfig();
  return useQuery({
    queryKey: hsKeys.leaderboard(config?.role ?? "", period),
    enabled: useReady() && Boolean(config),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const data = await call<LeaderboardData>("get", `${config!.base}/leaderboard`, { period }, signal);
      return { ...data, top_three: data?.top_three ?? [], me: data?.me ?? null };
    },
  });
}

// ===================== SIM requests =====================
export function useSimSuppliers(enabled = true) {
  const config = useHierarchyConfig();
  return useQuery({
    queryKey: hsKeys.suppliers(config?.role ?? ""),
    enabled: useReady() && Boolean(config) && enabled,
    staleTime: 5 * 60_000,
    queryFn: async ({ signal }) => {
      const data = await call<SimSuppliersData>("get", `${config!.base}/sim-request/suppliers`, undefined, signal);
      return { ...data, suppliers: data?.suppliers ?? [] };
    },
  });
}

export function useMySimRequests(q: SimRequestQuery, enabled = true) {
  const config = useHierarchyConfig();
  return useQuery({
    queryKey: hsKeys.mine(config?.role ?? "", q),
    enabled: useReady() && Boolean(config) && enabled,
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => normaliseList(await call<SimRequestList>("get", `${config!.base}/sim-request`, queryParams(q), signal)),
  });
}

/** Requests sent to you (SC: from partners, RM: from SCs). */
export function useIncomingSimRequests(q: SimRequestQuery, enabled = true) {
  const config = useHierarchyConfig();
  return useQuery({
    queryKey: hsKeys.incoming(config?.role ?? "", q),
    enabled: useReady() && Boolean(config?.requesterLabel) && enabled,
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => normaliseList(await call<SimRequestList>("get", `${config!.base}/sim-request/incoming`, queryParams(q), signal)),
  });
}

/** Requests change stock, so refresh everything inventory-related too. */
function useRefreshAll() {
  const client = useQueryClient();
  return () => client.invalidateQueries();
}

export function useCreateSimRequest() {
  const config = useHierarchyConfig();
  const client = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: (payload: CreateSimRequestPayload) => call<SimRequest>("post", `${config!.base}/sim-request`, payload),
    onSuccess: () => client.invalidateQueries({ queryKey: hsKeys.all }),
  });
}

export function useCancelSimRequest() {
  const config = useHierarchyConfig();
  const client = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: (id: number) => call<SimRequest>("patch", `${config!.base}/sim-request/${id}/cancel`),
    onSuccess: () => client.invalidateQueries({ queryKey: hsKeys.all }),
  });
}

export function useApproveSimRequest() {
  const config = useHierarchyConfig();
  const refresh = useRefreshAll();
  return useMutation({
    retry: false,
    mutationFn: ({ id, ...body }: ApproveSimRequestPayload & { id: number }) =>
      call<{ request: SimRequest; distributed?: { sim_type: SimType; total: number; numbers: string[] } }>("patch", `${config!.base}/sim-request/incoming/${id}/approve`, body),
    onSuccess: refresh,
  });
}

export function useRejectSimRequest() {
  const config = useHierarchyConfig();
  const client = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: ({ id, reason }: { id: number; reason?: string }) => call<SimRequest>("patch", `${config!.base}/sim-request/incoming/${id}/reject`, reason ? { reason } : {}),
    onSuccess: () => client.invalidateQueries({ queryKey: hsKeys.all }),
  });
}

// ===================== Your stock =====================
type RawAvailable = {
  sims?: { id: number; sim_number?: string; serial_no?: string; type?: string; type_label?: string; network?: string | null; received_at?: string | null }[];
  summary?: AvailableSimsData["summary"]; total?: number; page?: number; total_pages?: number;
  pagination?: Partial<Pagination>;
};

/** Your undistributed SIMs: the same list the Distribute screens pick from. */
export function useAvailableSims(q: { type: SimType; network?: string; search?: string; page: number; limit: number }, enabled = true) {
  const config = useHierarchyConfig();
  return useQuery({
    queryKey: hsKeys.available(config?.role ?? "", q),
    enabled: useReady() && Boolean(config?.requesterLabel) && enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    queryFn: async ({ signal }): Promise<AvailableSimsData> => {
      const params = { type: q.type, page: q.page, limit: q.limit, ...(q.network ? { network: q.network } : {}), ...(q.search ? { search: q.search } : {}) };
      const raw = await call<RawAvailable>("get", `${config!.base}/sim-inventory/undistributed`, params, signal);
      const sims = (raw?.sims ?? []).map((s) => ({
        id: s.id, number: s.sim_number ?? s.serial_no ?? "", type: s.type ?? q.type, type_label: s.type_label ?? "", network: s.network ?? null, received_at: s.received_at ?? null,
      })).filter((s) => s.number);
      const total = Number(raw?.total ?? raw?.pagination?.total ?? sims.length);
      return {
        sims, summary: raw?.summary ?? {}, total,
        page: Number(raw?.page ?? raw?.pagination?.page ?? q.page),
        totalPages: Number(raw?.total_pages ?? raw?.pagination?.totalPages ?? Math.max(1, Math.ceil(total / q.limit))),
      };
    },
  });
}

// ===================== Recall =====================
export function useRecallHolders(type?: SimType) {
  const config = useHierarchyConfig();
  const recall = config?.recall;
  return useQuery({
    queryKey: hsKeys.holders(config?.role ?? "", type),
    enabled: useReady() && Boolean(recall),
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }): Promise<RecallHoldersData> => {
      const data = await call<Record<string, unknown>>("get", recall!.holders, type ? { type } : undefined, signal);
      const holders = (data?.[recall!.listKey] as RecallHolder[] | undefined) ?? [];
      return { holders, count: Number(data?.count ?? holders.length), totals: (data?.totals ?? {}) as RecallHoldersData["totals"] };
    },
  });
}

export function useRecallableSims(holderId: number | null, q: { type?: SimType; search?: string; page: number; limit: number }) {
  const config = useHierarchyConfig();
  const recall = config?.recall;
  return useQuery({
    queryKey: hsKeys.holderSims(config?.role ?? "", holderId ?? "", q),
    enabled: useReady() && Boolean(recall) && holderId != null,
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }): Promise<RecallableSimsData> => {
      const params = { page: q.page, limit: q.limit, ...(q.type ? { type: q.type } : {}), ...(q.search ? { search: q.search } : {}) };
      const data = await call<Record<string, unknown>>("get", recall!.sims(holderId!), params, signal);
      const sims = (data?.sims as RecallableSimsData["sims"] | undefined) ?? [];
      return {
        sims,
        holder: data?.[recall!.holderKey] as RecallableSimsData["holder"],
        counts: (data?.counts ?? {}) as RecallableSimsData["counts"],
        pagination: (data?.pagination as Pagination | undefined) ?? emptyPagination(sims.length),
      };
    },
  });
}

export function useRecallSims() {
  const config = useHierarchyConfig();
  const refresh = useRefreshAll();
  return useMutation({
    retry: false,
    mutationFn: ({ holder, ...payload }: RecallPayload & { holder: RecallHolder }) => {
      const recall = config!.recall!;
      // The tested calls name SCs by user id and RMs' coordinators by agent id; both ids are accepted.
      const holderId = recall.bodyKey === "coordinator_id" ? holder.agent_id ?? holder.id : holder.id;
      return call<RecallResult>("post", recall.recall, { [recall.bodyKey]: holderId, ...payload });
    },
    onSuccess: refresh,
  });
}
