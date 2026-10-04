import { Package } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetApSimStock } from "../api";

const labels = [["pos_sim", "POS SIM"], ["cctv_sim", "CCTV SIM"], ["gps_sim", "GPS SIM"], ["router_sim", "Router SIM"]] as const;
export function ApSimStockBreakdownCard() {
  const { stock, isLoading } = useGetApSimStock();
  const counts = stock?.breakdown;
  return <section className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
    <h2 className="mb-3 font-bold text-[#0F152A]">Available SIM Stock</h2>
    {isLoading ? <p className="text-xs text-[#8C909B]">Loading stock…</p> : !stock || stock.total_available === 0 ? <AppEmptyState title="No SIM stock available" description="Your available stock will appear here." icon={<Package className="size-5" />} /> : <>
      <p className="mb-3 text-3xl font-black text-[#0F152A]">{stock.total_available}<span className="ml-2 text-xs font-medium text-[#66738C]">SIMs available</span></p>
      <div className="grid grid-cols-2 gap-2">{labels.map(([key, label]) => <div key={key} className="flex justify-between rounded-xl bg-[#F8FAFC] p-3 text-xs"><span className="text-[#66738C]">{label}</span><strong className="text-[#0F152A]">{counts?.[key] ?? 0}</strong></div>)}</div>
    </>}
  </section>;
}
