import { useCaMutation, type CaMutationOptions } from "./client";
import type { CaOnboardApPayload } from "../types/api";
import type { CaOnboardResult } from "../types/results";
export const useCaOnboardAp = (options?: CaMutationOptions<CaOnboardApPayload, CaOnboardResult>) => useCaMutation<CaOnboardApPayload, CaOnboardResult>("/onboard-ap", ["ca-dashboard-overview","ca-managed-partners"], options);
