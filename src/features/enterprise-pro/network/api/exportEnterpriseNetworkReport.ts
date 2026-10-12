import { authedHttpClient } from '@/utils/http/auth';
export async function getEnterpriseNetworkReport(): Promise<Blob> {
  const { data } = await authedHttpClient.get<Blob>('/enterprise/my-network/export', { responseType: 'blob' });
  if (data.type.includes('json')) {
    const error = JSON.parse(await data.text()) as { message?: string };
    throw new Error(error.message || 'Unable to export network report');
  }
  return data;
}
export function downloadNetworkReport(blob: Blob, filename = `Enterprise_Network_Report_${Date.now()}.csv`) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  try {
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
  } finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
export async function exportEnterpriseNetworkReport() { downloadNetworkReport(await getEnterpriseNetworkReport()); }
