import type { UseMutationOptions } from '@tanstack/react-query';
import { useInventoryMutation } from './client';
import type { SingleDistributionResult, DistributeSingleScPayload } from '../types/simInventory';
export const useDistributeToSingleSc = (options?: UseMutationOptions<SingleDistributionResult, Error, DistributeSingleScPayload>) => useInventoryMutation<SingleDistributionResult, DistributeSingleScPayload>('distribute/single', options, true);
