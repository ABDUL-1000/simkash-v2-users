import { useCaQuery } from "./client";
import type { CaRecentActivationsResponseData } from "../types/api";
export const useGetCaRecentActivations = (params: { filter: "all" | "mine"; page: number; limit: number }) => useCaQuery<CaRecentActivationsResponseData>("ca-recent-activations", "/recent-activations", params);
