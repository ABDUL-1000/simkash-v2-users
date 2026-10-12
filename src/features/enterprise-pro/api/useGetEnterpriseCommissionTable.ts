import { useQuery } from "@tanstack/react-query";
import { enterpriseGet } from "./client";
import type {
  EnterprisePeriod,
  CommissionTableResponseData,
} from "../types/dashboard";
export function useGetEnterpriseCommissionTable({
  period = "this_month",
  search = "",
  page = 1,
  limit = 10,
}: {
  period?: EnterprisePeriod;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ["enterprise-commission-table", { period, search, page, limit }],
    queryFn: ({ signal }) =>
      enterpriseGet<CommissionTableResponseData>(
        "commission-table",
        { period, search, page, limit },
        signal,
      ),
  });
}
