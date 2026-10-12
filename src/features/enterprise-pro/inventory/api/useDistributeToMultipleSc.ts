import type { UseMutationOptions } from '@tanstack/react-query';
import { useInventoryMutation } from './client';
import type { BulkDistributionResult, DistributeMultipleScPayload } from '../types/simInventory';
export const useDistributeToMultipleSc = (options?: UseMutationOptions<BulkDistributionResult, Error, DistributeMultipleScPayload>) => useInventoryMutation<BulkDistributionResult, DistributeMultipleScPayload>('distribute/multiple', options, true);
