import { AppModal } from "@/components/common/AppModal";
import type { ScCommissionItem } from "../types";

interface ScCommissionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator?: ScCommissionItem | null;
  onEditRate: (sc: ScCommissionItem) => void;
}

export function ScCommissionDetailModal({
  open,
  onOpenChange,
  coordinator,
  onEditRate,
}: ScCommissionDetailModalProps) {
  const scName = coordinator?.scName || "Aminat Okafor";
  const state = coordinator?.state || "Lagos";

  const marginRows = [
    { type: "POS SIM", acts: "1,534", wholesale: "₦2,500", retail: "₦4,500", margin: "₦2,000", total: "₦3,068K" },
    { type: "CCTV SIM", acts: "210", wholesale: "₦6,000", retail: "₦9,500", margin: "₦3,500", total: "₦735K" },
    { type: "GPS SIM", acts: "72", wholesale: "₦8,000", retail: "₦12,000", margin: "₦4,000", total: "₦288K" },
    { type: "Router SIM", acts: "24", wholesale: "₦5,000", retail: "₦8,000", margin: "₦3,000", total: "₦72K" },
  ];

  const topAps = [
    { name: "Rabiu Sani", acts: "847 acts", pct: "46.0%", margin: "₦1,894K", comm: "₦151K" },
    { name: "Chizoma Eze", acts: "634 acts", pct: "34.5%", margin: "₦1,396K", comm: "₦112K" },
    { name: "Hassan I.", acts: "421 acts", pct: "22.9%", margin: "₦842K", comm: "₦67K" },
    { name: "Abubakar S.", acts: "287 acts", pct: "15.6%", margin: "₦574K", comm: "₦46K" },
    { name: "Others (19)", acts: "650 acts", pct: "35.7%", margin: "₦1,114K", comm: "₦89K" },
  ];

  const trendHeights = [45, 60, 55, 75, 80, 95];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${scName} — Commission Detail`}
      description={`${state} · 23 APs · Jun 2026`}
      size="lg"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* Top Header Card */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
              AO
            </div>
            <div>
              <div className="font-bold text-sm text-white">{scName}</div>
              <div className="text-[11px] text-slate-400">{state} · 23 APs</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-bold text-white">₦3,841K total</span>
          </div>
        </div>

        {/* Margin Earnings Breakdown Table */}
        <div className="rounded-xl border border-slate-200 p-2.5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Margin Earnings Breakdown
          </span>
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-1 font-medium">Type</th>
                <th className="pb-1 font-medium text-right">Acts</th>
                <th className="pb-1 font-medium text-right">Wholesale</th>
                <th className="pb-1 font-medium text-right">Your Retail</th>
                <th className="pb-1 font-medium text-right">Margin/SIM</th>
                <th className="pb-1 font-medium text-right">Total Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {marginRows.map((r) => (
                <tr key={r.type}>
                  <td className="py-1 font-semibold text-slate-800">{r.type}</td>
                  <td className="py-1 text-right text-slate-600">{r.acts}</td>
                  <td className="py-1 text-right text-slate-600">{r.wholesale}</td>
                  <td className="py-1 text-right text-slate-600">{r.retail}</td>
                  <td className="py-1 text-right text-slate-600">{r.margin}</td>
                  <td className="py-1 text-right font-bold text-slate-900">{r.total}</td>
                </tr>
              ))}
              <tr className="font-bold text-slate-900 border-t border-slate-200">
                <td className="pt-1">Total</td>
                <td className="pt-1 text-right">1,840 acts</td>
                <td colSpan={3} />
                <td className="pt-1 text-right text-blue-600 font-black">₦4,233K</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Network Commission Strip */}
        <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-2.5 text-xs space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
            Network Commission
          </span>
          <p className="text-[11px] text-blue-900">
            ₦4,233K total margin × <strong>8% rate</strong> = <strong>₦338K network commission</strong>
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-1.5 bg-white rounded-lg text-center border border-blue-100">
              <span className="text-[10px] text-slate-400 block">Margin Earnings</span>
              <span className="font-bold text-slate-900">₦4,233K</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg text-center border border-blue-100">
              <span className="text-[10px] text-slate-400 block">Net Commission</span>
              <span className="font-bold text-emerald-600">+₦338K</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg text-center border border-blue-100">
              <span className="text-[10px] text-slate-400 block">Total SC Revenue</span>
              <span className="font-black text-slate-900">₦4,571K</span>
            </div>
          </div>
        </div>

        {/* Aminat's Top APs */}
        <div className="rounded-xl border border-slate-200 p-2.5 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Aminat's Top APs
            </span>
            <span className="text-[10px] text-slate-400">23 APs · Jun 2026</span>
          </div>
          <div className="space-y-1">
            {topAps.map((ap) => (
              <div key={ap.name} className="flex justify-between items-center text-[11px] py-0.5">
                <span className="font-semibold text-slate-800 w-28">{ap.name}</span>
                <span className="text-slate-500">{ap.acts}</span>
                <span className="text-slate-400">{ap.pct}</span>
                <span className="font-medium text-slate-700">{ap.margin}</span>
                <span className="font-bold text-emerald-600">{ap.comm}</span>
              </div>
            ))}
          </div>
          <div className="text-right pt-1">
            <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline">
              View all 23 APs →
            </button>
          </div>
        </div>

        {/* Monthly Performance Trend */}
        <div className="rounded-xl border border-slate-200 p-2.5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Monthly Performance Trend
          </span>
          <div className="flex items-end justify-between h-14 px-4 pt-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-1">
                <div
                  className="w-4 bg-emerald-500 rounded-t"
                  style={{ height: `${trendHeights[i]}%` }}
                />
                <span className="text-[10px] text-slate-400">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                if (coordinator) onEditRate(coordinator);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
            >
              Set SC Rate
            </button>
            <button type="button" className="text-xs font-semibold text-blue-600 hover:underline">
              View Profile →
            </button>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default ScCommissionDetailModal;
