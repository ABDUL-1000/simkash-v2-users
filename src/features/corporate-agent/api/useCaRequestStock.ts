import { useCaMutation, type CaMutationOptions } from "./client";
import type { CaRequestStockPayload } from "../types/api";
import type { CaStockResult } from "../types/results";
export const useCaRequestStock = (options?: CaMutationOptions<CaRequestStockPayload, CaStockResult>) => useCaMutation<CaRequestStockPayload, CaStockResult>("/request-stock", ["ca-dashboard-overview"], options);
