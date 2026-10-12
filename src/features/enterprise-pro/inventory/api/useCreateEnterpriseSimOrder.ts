import type { UseMutationOptions } from '@tanstack/react-query';
import { useInventoryMutation } from './client';
import type { OrderResult, CreateOrderPayload } from '../types/simInventory';
export const useCreateEnterpriseSimOrder = (options?: UseMutationOptions<OrderResult, Error, CreateOrderPayload>) => useInventoryMutation<OrderResult, CreateOrderPayload>('order/create', options, true);
