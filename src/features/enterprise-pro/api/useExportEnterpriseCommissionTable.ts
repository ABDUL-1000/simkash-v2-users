import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import { toast } from 'sonner';
import type { CommissionExportData, EnterprisePeriod } from '../types/dashboard';
export function useExportEnterpriseCommissionTable(options?: UseMutationOptions<CommissionExportData, Error, EnterprisePeriod>) {
 return useMutation({ ...options, mutationFn: (period: EnterprisePeriod) => enterpriseGet<CommissionExportData>('commission-table/export', { period }),
 onSuccess: (...args) => { const url = URL.createObjectURL(new Blob([JSON.stringify(args[0], null, 2)], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = 'enterprise-commissions-' + args[1] + '.json'; link.click(); URL.revokeObjectURL(url); options?.onSuccess?.(...args); },
 onError: (...args) => { toast.error(args[0].message); options?.onError?.(...args); }, onSettled: (...args) => options?.onSettled?.(...args) });
}
