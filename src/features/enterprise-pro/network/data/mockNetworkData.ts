import { mockCoordinatorsPart1 } from "./mockCoordinatorsPart1";
import { mockCoordinatorsPart2 } from "./mockCoordinatorsPart2";
import type { StateCoordinatorNetwork } from "../types";

export * from "./mockNetworkKPIs";

export const mockCoordinatorsNetwork: StateCoordinatorNetwork[] = [
  ...mockCoordinatorsPart1,
  ...mockCoordinatorsPart2,
];
