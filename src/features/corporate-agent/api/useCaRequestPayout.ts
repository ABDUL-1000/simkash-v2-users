import { useCaMutation, type CaMutationOptions } from "./client";
import type { CaRequestPayoutPayload } from "../types/api";
import type { CaPayoutResult } from "../types/results";
export const useCaRequestPayout = (options?: CaMutationOptions<CaRequestPayoutPayload, CaPayoutResult>) => useCaMutation<CaRequestPayoutPayload, CaPayoutResult>("/request-payout", ["ca-dashboard-overview"], options);
