import type { UseMutationOptions } from '@tanstack/react-query';
import { useInventoryMutation } from './client';
import type { EnterpriseOrderPreviewData, OrderPayload } from '../types/simInventory';
export const usePreviewEnterpriseOrder = (options?: UseMutationOptions<EnterpriseOrderPreviewData, Error, OrderPayload>) => useInventoryMutation<EnterpriseOrderPreviewData, OrderPayload>('order/preview', options, false);
