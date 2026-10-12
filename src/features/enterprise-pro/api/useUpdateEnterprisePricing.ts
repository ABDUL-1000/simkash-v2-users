import type { UseMutationOptions } from '@tanstack/react-query';
import { useEnterpriseMutation } from './client';
import type { UpdatePricingPayload } from '../types/dashboard';
export const useUpdateEnterprisePricing = (options?: UseMutationOptions<{ pricing: UpdatePricingPayload }, Error, UpdatePricingPayload>) => useEnterpriseMutation<{ pricing: UpdatePricingPayload }, UpdatePricingPayload>('pricing', 'put', ["enterprise-pricing","enterprise-commission-table","enterprise-overview","enterprise-recent-activity"], options);
