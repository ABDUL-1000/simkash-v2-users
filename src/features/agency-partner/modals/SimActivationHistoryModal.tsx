import { useState } from "react";
import { Download, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import { useGetActivatedSims, useGetApDashboardSummary } from "../api";
import type { ActivatedSimsResponse, ActivatedDeviceSimItem } from "../types/api";

export interface HistoryRecordItem {
  id: string;
  simNumber: string;
  type: string;
  network: string;
  customerName: string;
  customerPhone: string;
  activatedDate: string;
  status: "Active" | "Expiring" | "Expired" | "Renewed";
}

const PAGE = 15;
const TAB_TYPES: Record<string, string> = { All: "all", "POS SIM": "pos", "CCTV SIM": "cctv", "GPS SIM": "gps", "Router SIM": "router" };
const SHORT_TYPE: Record<string, string> = { pos: "POS", cctv: "CCTV", gps: "GPS", router: "Router" };
const formatStamp = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
/** API status + expiry date → the modal's badge states ("Renewed" isn't reported by the API). */
function toStatus(sim: ActivatedDeviceSimItem): HistoryRecordItem["status"] {
  const daysLeft = (new Date(sim.expired_date).getTime() - Date.now()) / 86_400_000;
  if (/expired/i.test(sim.status) || daysLeft < 0) return "Expired";
  if (daysLeft <= 7) return "Expiring";
  return "Active";
}
const toRecord = (sim: ActivatedDeviceSimItem): HistoryRecordItem => ({
  id: String(sim.id), simNumber: sim.sim_number, type: SHORT_TYPE[sim.sim_type] ?? sim.type_label, network: sim.network,
  customerName: sim.customer.fullname, customerPhone: sim.customer.phone, activatedDate: formatStamp(sim.activated_at), status: toStatus(sim),
});

interface SimActivationHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewRecordDetails?: (record: HistoryRecordItem) => void;
  onExport?: () => void;
}

export function SimActivationHistoryModal({
  open,
  onOpenChange,
  onViewRecordDetails,
  onExport,
}: SimActivationHistoryModalProps) {
  const [activeTab, setActiveTab] = useState<"All" | "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM">("All");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [exporting, setExporting] = useState(false);
  // Date pills (Today / This Week / This Month / All Time) are disabled: /activated has no date filter.
  const query = useGetActivatedSims({ type: TAB_TYPES[activeTab], search: search.trim(), page: 1, limit });
  const allTime = useGetActivatedSims({ type: "all", page: 1, limit: 1 });
  const { summary } = useGetApDashboardSummary();
  const filtered = query.sims.map(toRecord);
  const total = query.result?.total ?? 0;

  // Exports up to 100 records (the endpoint's page-size maximum) for the current tab and search as CSV.
  const exportCsv = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ type: TAB_TYPES[activeTab], search: search.trim(), page: "1", limit: "100" });
      const { data } = await authedHttpClient.get<ActivatedSimsResponse>(`/partner/device-sim/activated?${params}`);
      if (!data.success) throw new Error(data.message);
      const rows = data.data.sims;
      const cell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const csv = [["SIM Number", "Type", "Network", "Customer", "Phone", "Activated", "Expires", "Status", "Commission"],
        ...rows.map(sim => [sim.sim_number, sim.type_label, sim.network, sim.customer.fullname, sim.customer.phone, sim.activated_at, sim.expired_date, sim.status, sim.commission])]
        .map(line => line.map(cell).join(",")).join("\n");
      const href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      const link = document.createElement("a"); link.href = href; link.download = "sim-activation-history.csv";
      document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(href), 1000);
      onExport?.();
    } catch (error) {
      openNotification({ state: "error", title: "Export failed", description: (error as Error).message });
    } finally {
      setExporting(false);
    }
  };

  const getStatusBadge = (status: HistoryRecordItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#EBFFF8] text-[#10B981]";
      case "Expiring":
        return "bg-[#FFFBEB] text-[#D9990D]";
      case "Expired":
        return "bg-[#FFF7F8] text-[#EF4444]";
      case "Renewed":
        return "bg-[#EFF4F8] text-[#2563EB]";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="SIM Activation History"
      description="All SIMs you have ever activated"
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* SIM Type Tabs (Matching Image 4) */}
        <div className="flex items-center gap-4 sm:gap-6 border-b border-[#E2ECF6] overflow-x-auto no-scrollbar">
          {(["All", "POS SIM", "CCTV SIM", "GPS SIM", "Router SIM"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => { setActiveTab(tab); setLimit(PAGE); }}
                className={`pb-2.5 text-xs font-bold shrink-0 transition border-b-2 -mb-px ${
                  isSelected
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#66738C] hover:text-[#0F152A]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Date Filter Pills are disabled: no date filter on /partner/device-sim/activated. */}

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 size-4 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search by SIM number or customer name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setLimit(PAGE); }}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] pl-10 pr-4 py-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* 4 Summary Metric Cards Strip (Matching Image 4) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">TOTAL</span>
            <h3 className="text-lg font-black text-[#0F152A]">{(allTime.result?.total ?? 0).toLocaleString()}</h3>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">THIS MONTH</span>
            <h3 className="text-lg font-black text-[#0F152A]">{(summary?.this_month.activations ?? 0).toLocaleString()}</h3>
          </div>
          {/* THIS WEEK card is disabled: no weekly activation count in the API. */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">TODAY</span>
            <h3 className="text-lg font-black text-[#0F152A]">{(summary?.today.activations ?? 0).toLocaleString()}</h3>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B]">
                  <th className="p-3">SIM NUMBER</th>
                  <th className="p-3">TYPE</th>
                  <th className="p-3">NET</th>
                  <th className="p-3">CUSTOMER</th>
                  <th className="p-3">ACTIVATED</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                {query.isLoading && <tr><td colSpan={7} className="p-4"><div className="h-24 animate-pulse rounded-xl bg-slate-100" /></td></tr>}
                {!query.isLoading && filtered.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-[11px] text-[#8C909B]">{query.error ? query.error.message : "No activations found."}</td></tr>}
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3 font-extrabold font-mono text-[#0F152A]">
                      {r.simNumber}
                    </td>
                    <td className="p-3">
                      <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                        {r.type}
                      </span>
                    </td>
                    <td className="p-3 font-bold">{r.network}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-[#0F152A]">{r.customerName}</div>
                      <span className="text-[10px] text-[#8C909B] font-mono">{r.customerPhone}</span>
                    </td>
                    <td className="p-3 text-[#66738C] font-mono text-[11px]">
                      {r.activatedDate}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${getStatusBadge(
                          r.status
                        )}`}
                      >
                        ● {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => onViewRecordDetails?.(r)}
                        className="text-xs font-bold text-[#2563EB] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-3 border-t border-[#E2ECF6] bg-[#F8FAFC]">
            <span className="text-xs text-[#8C909B] font-medium">
              Showing {filtered.length} of {total.toLocaleString()}
            </span>
            {filtered.length < total && <button
              type="button"
              disabled={query.isFetching}
              onClick={() => setLimit(current => current + PAGE)}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              {query.isFetching ? "Loading..." : "Load more"}
            </button>}
          </div>
        </div>

        {/* Footer Actions Strip (Matching Image 4) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => void exportCsv()}
            disabled={exporting}
            className="flex items-center gap-1.5 disabled:opacity-50 text-xs font-bold text-[#2563EB] hover:underline"
          >
            <Download className="size-4" />
            <span>{exporting ? "Exporting..." : "Export History"}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
