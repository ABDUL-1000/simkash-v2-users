import type { UseMutationOptions } from '@tanstack/react-query';
import { useNetworkMutation } from './client';
import type { AddCoordinatorResult, OnboardScPayload, OnboardScResult, RemindScPayload, SuspendScPayload, SuspendScResult, VerifiedCoordinator } from '../types/api';

/** POST /verify-coordinator — no toast; the modal shows the result inline. */
export const useVerifyCoordinator = () => useNetworkMutation<VerifiedCoordinator, { phone: string }>('verify-coordinator', undefined, { silent: true });
/** POST /onboard */
export const useOnboardStateCoordinator = (options?: UseMutationOptions<OnboardScResult, Error, OnboardScPayload>) =>
  useNetworkMutation<OnboardScResult, OnboardScPayload>('onboard', options);
/** POST /add-coordinator — an existing State Coordinator joins your network. */
export const useAddExistingCoordinator = (options?: UseMutationOptions<AddCoordinatorResult, Error, { phone: string }>) =>
  useNetworkMutation<AddCoordinatorResult, { phone: string }>('add-coordinator', options);
/** POST /remind */
export const useRemindCoordinator = (options?: UseMutationOptions<unknown, Error, RemindScPayload>) =>
  useNetworkMutation<unknown, RemindScPayload>('remind', options);
/** POST /{coordinatorId}/suspend { action, reason } */
export const useUpdateScStatus = (scId: string | number, options?: UseMutationOptions<SuspendScResult, Error, SuspendScPayload>) =>
  useNetworkMutation<SuspendScResult, SuspendScPayload>(encodeURIComponent(String(scId)) + '/suspend', options);
