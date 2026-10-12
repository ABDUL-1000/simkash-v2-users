import { useCaMutation, type CaMutationOptions } from "./client";
import type { CaDistributePayload } from "../types/api";
import type { CaDistributionResult } from "../types/results";
export const useCaDistributeStock = (options?: CaMutationOptions<CaDistributePayload, CaDistributionResult>) => useCaMutation<CaDistributePayload, CaDistributionResult>("/distribute", ["ca-dashboard-overview","ca-managed-partners"], options);
