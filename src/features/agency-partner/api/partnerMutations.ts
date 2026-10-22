import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";

const notifyError = (error: Error) => openNotification({ state: "error", title: "Request Failed", description: error.message });
const invalidateCustomers = (client: ReturnType<typeof useQueryClient>) => {
  void client.invalidateQueries({ queryKey: ["partner-customer-overview"] });
  void client.invalidateQueries({ queryKey: ["partner-customers"] });
  void client.invalidateQueries({ queryKey: ["partner-customer-detail"] });
};
export const useAddPartnerCustomer = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (payload: Record<string, unknown>) => (await authedHttpClient.post("/partner/customers", payload)).data, onSuccess: () => { invalidateCustomers(client); openNotification({ state: "success", title: "Customer Added" }); }, onError: notifyError });
};
export const useEditPartnerCustomer = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async ({ id, ...payload }: { id: number | string; [key: string]: unknown }) => (await authedHttpClient.put(`/partner/customers/${id}`, payload)).data, onSuccess: () => { invalidateCustomers(client); openNotification({ state: "success", title: "Customer Updated" }); }, onError: notifyError });
};
export const useSendCustomerReminder = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (id: number | string) => (await authedHttpClient.post(`/partner/customers/${id}/remind`)).data, onSuccess: () => { invalidateCustomers(client); openNotification({ state: "success", title: "Reminder Sent", description: "The customer has been reminded." }); }, onError: notifyError });
};
export const useSendAllCustomerReminders = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async () => (await authedHttpClient.post("/partner/customers/send-all-reminders")).data, onSuccess: () => { invalidateCustomers(client); openNotification({ state: "success", title: "Reminders Sent", description: "Expiring customers have been notified." }); }, onError: notifyError });
};
export const useAddCustomerNote = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async ({ id, content }: { id: number | string; content: string }) => (await authedHttpClient.post(`/partner/customers/${id}/notes`, { note: content })).data, onSuccess: (_data, variables) => { void client.invalidateQueries({ queryKey: ["partner-customer-detail", variables.id] }); openNotification({ state: "success", title: "Note Added" }); }, onError: notifyError });
};
export const useSetPartnerPayoutAccount = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (payload: Record<string, unknown>) => (await authedHttpClient.post("/partner/wallet/payout-account", payload)).data, onSuccess: () => { void client.invalidateQueries({ queryKey: ["partner-payout-account"] }); openNotification({ state: "success", title: "Payout Account Saved" }); }, onError: notifyError });
};
export const useRequestPartnerPayout = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (payload: Record<string, unknown>) => (await authedHttpClient.post("/partner/wallet/request-payout", payload)).data, onSuccess: () => { void client.invalidateQueries({ queryKey: ["partner-wallet-overview"] }); void client.invalidateQueries({ queryKey: ["partner-wallet-transactions"] }); void client.invalidateQueries({ queryKey: ["ap-dashboard-summary"] }); void client.invalidateQueries({ queryKey: ["ap-commission-month"] }); openNotification({ state: "success", title: "Payout Requested" }); }, onError: notifyError });
};
export const useRetryTransaction = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (id: string) => (await authedHttpClient.post(`/partner/wallet/transactions/${id}/retry`)).data, onSuccess: () => { void client.invalidateQueries({ queryKey: ["partner-wallet-transactions"] }); void client.invalidateQueries({ queryKey: ["partner-wallet-overview"] }); openNotification({ state: "success", title: "Transaction Retry Started" }); }, onError: notifyError });
};
export const useBulkRetryFailedTransactions = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: async () => (await authedHttpClient.post("/partner/wallet/transactions/retry-failed")).data, onSuccess: () => { void client.invalidateQueries({ queryKey: ["partner-wallet-transactions"] }); openNotification({ state: "success", title: "Retry Started" }); }, onError: notifyError });
};

/** GET /partner/wallet/transactions/export — downloads the filtered transactions as CSV. */
export const useExportPartnerTransactions = () => useMutation({
  mutationFn: async (params: { period: string; category: string; status: string; search: string }) => {
    const { data } = await authedHttpClient.get<Blob>("/partner/wallet/transactions/export", { params, responseType: "blob" });
    if (data.type.includes("json")) throw new Error((JSON.parse(await data.text()) as { message?: string }).message || "Export failed");
    const href = URL.createObjectURL(data);
    const link = document.createElement("a"); link.href = href; link.download = "partner-transactions.csv";
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(href), 1000);
  },
  onSuccess: () => openNotification({ state: "success", title: "CSV download started" }),
  onError: notifyError,
});
