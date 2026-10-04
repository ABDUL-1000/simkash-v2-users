import { useMutation } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { RmDates } from "../types/territory";

export function useRmCsvExport(url: string, filename: string) {
  return useMutation({ mutationFn: async (params: RmDates = {}) => {
    const { data } = await authedHttpClient.get<Blob>(url, { params, responseType: "blob" });
    if (data.type.includes("json")) {
      const error = JSON.parse(await data.text()) as { message?: string };
      throw new Error(error.message || "Export failed.");
    }
    const href = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = href; link.download = filename;
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(href), 1000);
  }, onSuccess: () => openNotification({ state: "success", title: "CSV download started" }),
  onError: (error: Error) => openNotification({ state: "error", title: "Export failed", description: error.message }) });
}
