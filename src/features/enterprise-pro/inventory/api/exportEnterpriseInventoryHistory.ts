import { authedHttpClient } from '@/utils/http/auth';
export async function exportEnterpriseInventoryHistory() {
    const res = await authedHttpClient.get<Blob>('/enterprise/sim-inventory/history/export', { responseType: 'blob' });
    const blob = res.data;
    if (blob.type.includes('json')) {
        const error = JSON.parse(await blob.text()) as {
            message?: string;
        };
        throw new Error(error.message || 'Inventory export failed');
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    try {
        link.href = url;
        link.download = 'SIM_Inventory_History_' + Date.now() + '.csv';
        document.body.appendChild(link);
        link.click();
    }
    finally {
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}
