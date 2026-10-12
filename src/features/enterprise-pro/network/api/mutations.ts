import type { UseMutationOptions } from '@tanstack/react-query';
import { useNetworkMutation } from './client';
import type { OnboardScPayload, OnboardScResult, UpdateScStatusPayload, UpdateScStatusResult } from '../types/api';
export const useOnboardStateCoordinator = (options?: UseMutationOptions<OnboardScResult, Error, OnboardScPayload>) =>
  useNetworkMutation<OnboardScResult, OnboardScPayload>('onboard-sc', 'post', options);
export const useUpdateScStatus = (scId: string | number, options?: UseMutationOptions<UpdateScStatusResult, Error, UpdateScStatusPayload>) =>
  useNetworkMutation<UpdateScStatusResult, UpdateScStatusPayload>('sc/' + encodeURIComponent(String(scId)) + '/status', 'patch', options);
