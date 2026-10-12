import type { UseMutationOptions } from '@tanstack/react-query';
import { useEnterpriseMutation } from './client';
import type { OrderSimsPayload, ActionResult } from '../types/dashboard';
export const useEnterpriseOrderSims = (options?: UseMutationOptions<ActionResult, Error, OrderSimsPayload>) => useEnterpriseMutation<ActionResult, OrderSimsPayload>('order-sims', 'post', ["enterprise-overview","enterprise-recent-activity","enterprise-wallet-overview","enterprise-wallet-transactions","enterprise-wallet-activity","enterprise-wallet-statement"], options);
