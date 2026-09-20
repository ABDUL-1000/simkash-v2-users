import { Smartphone, Download, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmEasyBuyDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport?: () => void;
}

const EASYBUY_BY_SC = [
  { scName: "Aminat Okafor", state: "Lagos", contracts: 342, financedValue: 6840000, commission: 11800 },
  { scName: "Babajide Sanusi", state: "Oyo", contracts: 210, financedValue: 3950000, commission: 7200 },
  { scName: "Chioma Okonkwo", state: "Rivers", contracts: 184, financedValue: 3120000, commission: 5900 },
  { scName: "Ibrahim Danladi", state: "Kano", contracts: 165, financedValue: 2800000, commission: 4800 },
  { scName: "Emmanuel Eze", state: "Enugu", contracts: 140, financedValue: 2450000, commission: 4100 },
  { scName: "Fatima Al-Hassan", state: "Kaduna", contracts: 112, financedValue: 1980000, commission: 3400 },
  { scName: "Other 6 SCs", state: "6 States", contracts: 267, financedValue: 3660000, commission: 5400 },
];

export function RmEasyBuyDetailsModal({
  open,
  onOpenChange,
  onExport,
}: RmEasyBuyDetailsModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="EasyBuy Device Financing Commission"
      description="Passive 1% override on financed devices across your regional network"
      descriptionColor={APP_COLORS.texts.slate}
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Summary Banner */}
        <div
          className="rounded-2xl border p-4 text-white space-y-3"
          style={{
            background: "linear-gradient(135deg, #1F3A5F 0%, #2E5FA0 100%)",
            borderColor: APP_COLORS.blues.secondary,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-base font-bold">1% Passive EasyBuy Override</h4>
                <p className="text-[11px] text-blue-100">
                  Earned automatically whenever your APs or SCs finance smartphones & terminals
                </p>
              </div>
            </div>
            <div className="text-right sm:border-l sm:border-white/20 sm:pl-4">
              <span className="text-[10px] text-blue-200 uppercase font-semibold block">Total Passive Earned</span>
              <span className="text-2xl font-black text-amber-400">₦248,000</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-blue-200 block">Active Contracts</span>
              <span className="text-sm font-bold text-white">1,420</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-blue-200 block">Financed Volume</span>
              <span className="text-sm font-bold text-white">₦24.8M</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-blue-200 block">Override Rate</span>
              <span className="text-sm font-bold text-amber-300">1.0% Fixed</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-blue-200 block">This Month's Gain</span>
              <span className="text-sm font-bold text-emerald-300">₦42,600</span>
            </div>
          </div>
        </div>

        {/* Breakdown by SC */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-sm" style={{ color: APP_COLORS.texts.primary }}>
              Financing Performance by State Coordinator
            </h5>
            <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              12 Active Coordinators
            </span>
          </div>

          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead
                  style={{
                    backgroundColor: APP_COLORS.backgrounds.surface,
                    borderBottom: `1px solid ${APP_COLORS.greys.stroke}`,
                    color: APP_COLORS.texts.slate,
                  }}
                >
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">State Coordinator</th>
                    <th className="py-2.5 px-3 font-semibold">State</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Active Devices</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Financed Value</th>
                    <th className="py-2.5 px-3 font-semibold text-right">1% Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
                  {EASYBUY_BY_SC.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2 px-3 font-semibold" style={{ color: APP_COLORS.texts.primary }}>
                        {row.scName}
                      </td>
                      <td className="py-2 px-3" style={{ color: APP_COLORS.texts.slate }}>
                        {row.state}
                      </td>
                      <td className="py-2 px-3 text-right font-medium" style={{ color: APP_COLORS.texts.primary }}>
                        {row.contracts.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-medium" style={{ color: APP_COLORS.texts.slate }}>
                        ₦{row.financedValue.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-bold" style={{ color: APP_COLORS.greens.secondary }}>
                        ₦{row.commission.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div
          className="rounded-xl p-3 flex items-start gap-2.5"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            borderColor: APP_COLORS.blues.surfaceMid,
          }}
        >
          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div className="text-[11px] leading-relaxed" style={{ color: APP_COLORS.blues.primary }}>
            <strong>Continuous Lifetime Override:</strong> As long as customer repayments are active on financed devices, 1% override accrues directly to your monthly commission wallet on the 1st of every calendar month.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold border transition-colors hover:bg-slate-100"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.texts.slate,
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onExport?.();
              onOpenChange(false);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-95"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export EasyBuy Report</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
