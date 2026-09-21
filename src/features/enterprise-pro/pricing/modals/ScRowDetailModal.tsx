import React from "react";
import { AppModal } from "@/components/common/AppModal";
import type { CommissionRecord } from "../types";

interface ScRowDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: CommissionRecord | null;
  onSetScRate?: (sc: CommissionRecord) => void;
  onDistributeStock?: (sc: CommissionRecord) => void;
}

export const ScRowDetailModal: React.FC<ScRowDetailModalProps> = ({
  open,
  onOpenChange,
  record,
  onSetScRate,
  onDistributeStock,
}) => {
  if (!record) return null;

  const simBreakdown = [
    { type: "POS SIM", acts: "1,104", wholesale: "₦2,500", retail: "₦4,500", margin: "₦2,000", total: "₦1,008K", color: "text-[#0284c7]" },
    { type: "CCTV SIM", acts: "247", wholesale: "₦6,000", retail: "₦9,500", margin: "₦3,500", total: "₦864.5K", color: "text-[#10b981]" },
    { type: "GPS SIM", acts: "72", wholesale: "₦8,000", retail: "₦12,000", margin: "₦4,000", total: "₦288K", color: "text-[#8b5cf6]" },
    { type: "Router SIM", acts: "24", wholesale: "₦6,000", retail: "₦9,000", margin: "₦3,000", total: "₦72K", color: "text-[#f97316]" },
  ];

  const topAps = [
    { name: "Rabiu Sani", acts: "647 acts", revenue: "₦1,034K", share: "45.3%" },
    { name: "Chioma Eze", acts: "524 acts", revenue: "₦1,200K", share: "34.2%" },
    { name: "Hassan Ibrahim", acts: "121 acts", revenue: "₦842K", share: "22.8%" },
    { name: "Others (20 APs)", acts: "—", revenue: "₦658.5K", share: "15.6%" },
  ];

  const firstName = record.name.split(" ")[0];

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{record.name} — Commission Detail</h3>
          <p className="text-[11px] text-slate-400">{record.state} · {record.apsCount} APs · Jun 2026</p>
        </div>

        {/* Top Profile Card */}
        <div className="p-3 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
              {record.initials}
            </div>
            <div>
              <div className="font-bold text-xs">{record.name}</div>
              <div className="text-[10px] text-slate-300">{record.state} · {record.apsCount} APs</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-extrabold text-white">₦3,893,900 net</div>
            <div className="text-[10px] text-slate-300">this month</div>
          </div>
        </div>

        {/* Margin by SIM type table */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            MARGIN BY SIM TYPE
          </span>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-[11px]">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-1.5 pl-2.5">Type</th>
                  <th className="p-1.5 text-right">Acts</th>
                  <th className="p-1.5 text-right">Wholesale</th>
                  <th className="p-1.5 text-right">Retail</th>
                  <th className="p-1.5 text-right">Margin/SIM</th>
                  <th className="p-1.5 pr-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simBreakdown.map((r) => (
                  <tr key={r.type}>
                    <td className="p-1.5 pl-2.5 font-semibold text-slate-800">{r.type}</td>
                    <td className="p-1.5 text-right text-slate-600">{r.acts}</td>
                    <td className="p-1.5 text-right text-slate-500">{r.wholesale}</td>
                    <td className="p-1.5 text-right text-slate-900 font-medium">{r.retail}</td>
                    <td className="p-1.5 text-right text-slate-600 font-medium">{r.margin}</td>
                    <td className={`p-1.5 pr-2.5 text-right font-extrabold ${r.color}`}>{r.total}</td>
                  </tr>
                ))}
                <tr className="bg-[#1E3A5F] text-white font-bold text-[11px]">
                  <td className="p-1.5 pl-2.5">Total</td>
                  <td className="p-1.5 text-right">1,447</td>
                  <td className="p-1.5 text-right">—</td>
                  <td className="p-1.5 text-right">—</td>
                  <td className="p-1.5 text-right">—</td>
                  <td className="p-1.5 pr-2.5 text-right font-black">₦4,232.5K</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SC Commission Calculation Box */}
        <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">
            SC COMMISSION (8%)
          </span>
          <div className="text-xs font-bold text-amber-900 mt-0.5">
            ₦4,232,500 × 8% = <strong className="font-extrabold">₦338,600</strong>
          </div>
        </div>

        {/* Margin Summary Rows */}
        <div className="space-y-1 text-xs border-t border-slate-100 pt-2">
          <div className="flex justify-between text-slate-600">
            <span>Total margin:</span>
            <span className="font-semibold text-slate-900">₦4,232,500</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>SC commission:</span>
            <span className="font-semibold text-red-500">-₦338,600</span>
          </div>
          <div className="flex justify-between text-slate-900 font-bold text-xs pt-0.5 border-t border-slate-100">
            <span>Net EP:</span>
            <span className="font-black text-blue-600">₦3,893,900</span>
          </div>
        </div>

        {/* Top APs Contributing */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            TOP APs CONTRIBUTING
          </span>
          <div className="space-y-1 text-xs">
            {topAps.map((ap) => (
              <div key={ap.name} className="flex items-center justify-between text-slate-700 py-0.5">
                <span className="font-medium">{ap.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[11px]">{ap.acts}</span>
                  <span className="font-bold text-slate-900 min-w-[55px] text-right">{ap.revenue}</span>
                  <span className="text-emerald-600 font-semibold min-w-[40px] text-right">{ap.share}</span>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 font-semibold text-[11px] hover:underline pt-0.5 block"
            >
              → View all 23 APs
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onSetScRate?.(record);
            }}
            className="flex-1 py-2 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition text-[11px]"
          >
            Set {firstName}'s SC Rate
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onDistributeStock?.(record);
            }}
            className="flex-1 py-2 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition text-[11px]"
          >
            Distribute Stock
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-5 py-2 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition text-[11px]"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
};
