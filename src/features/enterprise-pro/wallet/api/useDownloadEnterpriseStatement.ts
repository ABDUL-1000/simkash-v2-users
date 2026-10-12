import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
export async function downloadEnterpriseStatement(): Promise<Blob> {
 const response = await authedHttpClient.get<Blob>('/enterprise/wallet/statement/download', { responseType: 'blob' });
 if (response.data.type.includes('json')) {
  const error = JSON.parse(await response.data.text());
  throw new Error(error.message || 'The statement could not be downloaded');
 }
 return response.data;
}
export function useDownloadEnterpriseStatement(options?: UseMutationOptions<Blob, Error, void>) {
 return useMutation({ ...options, mutationFn: downloadEnterpriseStatement,
  onSuccess: (...args) => {
   const url = URL.createObjectURL(args[0]); const link = document.createElement('a');
   link.href = url; link.download = 'enterprise-wallet-statement.csv'; document.body.appendChild(link); link.click(); link.remove();
   setTimeout(() => URL.revokeObjectURL(url), 1000);
   options?.onSuccess?.(...args);
  },
  onError: (...args) => { openNotification({ state: 'error', title: 'Statement download failed', description: args[0].message }); options?.onError?.(...args); },
  onSettled: (...args) => options?.onSettled?.(...args),
 });
}
