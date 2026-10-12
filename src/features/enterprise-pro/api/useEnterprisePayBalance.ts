import type { UseMutationOptions } from '@tanstack/react-query';
import { useEnterpriseMutation } from './client';
import type { PayBalancePayload, ActionResult } from '../types/dashboard';
export const useEnterprisePayBalance = (options?: UseMutationOptions<ActionResult, Error, PayBalancePayload>) => useEnterpriseMutation<ActionResult, PayBalancePayload>('pay-balance', 'post', ["enterprise-overview","enterprise-recent-activity"], options);
