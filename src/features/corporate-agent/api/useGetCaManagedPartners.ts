import { useCaQuery } from "./client";
import type { CaManagedPartnersResponseData } from "../types/api";
export const useGetCaManagedPartners = (params: { page: number; limit: number; search: string }) => useCaQuery<CaManagedPartnersResponseData>("ca-managed-partners", "/agency-partners", params);
