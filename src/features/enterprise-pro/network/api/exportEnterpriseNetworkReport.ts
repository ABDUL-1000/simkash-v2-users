import { useMutation } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';

/** GET /my-state-coordinator/export (CSV) */
export function useExportStateCoordinators() {
  return useMutation({
    retry: false,
    mutationFn: async () => {
      const { data } = await authedHttpClient.get<Blob>('/enterprise/my-state-coordinator/export', { responseType: 'blob' });
      if (data.type.includes('json')) {
        const error = JSON.parse(await data.text()) as { message?: string };
        throw new Error(error.message || 'Unable to export State Coordinators');
      }
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'enterprise-state-coordinators.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    onError: (error: Error) => openNotification({ state: 'error', title: 'Export failed', description: error.message }),
  });
}
