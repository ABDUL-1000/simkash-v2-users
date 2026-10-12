import type { UseMutationOptions } from '@tanstack/react-query';
import { useEnterpriseMutation } from './client';
import type { ReinvestPayload, ActionResult } from '../types/dashboard';
export const useEnterpriseReinvest = (options?: UseMutationOptions<ActionResult, Error, ReinvestPayload>) => useEnterpriseMutation<ActionResult, ReinvestPayload>('reinvest', 'post', ["enterprise-overview","enterprise-recent-activity","enterprise-investment-returns","enterprise-roi-projection"], options);
