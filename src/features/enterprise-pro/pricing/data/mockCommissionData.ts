import { mockCommissionRecordsPart1 } from "./mockCommissionRecordsPart1";
import { mockCommissionRecordsPart2 } from "./mockCommissionRecordsPart2";
import type { CommissionRecord } from "../types";

export const mockCommissionRecords: CommissionRecord[] = [
  ...mockCommissionRecordsPart1,
  ...mockCommissionRecordsPart2,
];
