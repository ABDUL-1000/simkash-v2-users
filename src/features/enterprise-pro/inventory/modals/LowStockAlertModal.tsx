import React from "react";
import { useNavigate } from "react-router-dom";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";

interface LowStockAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LowStockAlertModal: React.FC<LowStockAlertModalProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    onOpenChange(false);
    navigate(`${appPaths.enterpriseProOrderMoreSims}?gps=500`);
  };

  const scStatuses = [
    { name: "Aminat (Lagos)", stock: "72 SIMs", status: "~3 days", color: "text-amber-500 font-medium" },
    { name: "Kola (Oyo)", stock: "72 SIMs", status: "~3 days", color: "text-amber-500 font-medium" },
    { name: "Ibrahim (Rivers)", stock: "0 SIMs", status: "No stock", color: "text-rose-600 font-bold" },
    { name: "Emeka (Edo)", stock: "72 SIMs", status: "~3 days", color: "text-amber-500 font-medium" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      footer={null}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Alert Header Banner */}
        <div className="p-4 bg-[#FFF5F5] rounded-2xl flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-rose-500 shrink-0" />
          <div>
            <h3 className="text-base font-extrabold text-rose-600">Low Stock Alert</h3>
            <p className="text-xs text-slate-400">Automatic alert — below minimum threshold</p>
          </div>
        </div>

        {/* GPS SIM Critically Low Card */}
        <div className="p-4 bg-white rounded-2xl border-2 border-rose-500 space-y-2">
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
            GPS SIM Critically Low
          </span>
          <h4 className="text-sm font-extrabold text-slate-900">
            450 SIMs remaining — below 500 minimum
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your 4 SCs using GPS SIMs may run out of stock within 3–5 days at current distribution pace.
          </p>
          <div className="pt-1">
            <span className="text-xs font-extrabold text-[#1E3A5F] tracking-wide block">
              ORDER AT LEAST 500 GPS SIMs NOW
            </span>
          </div>
        </div>

        {/* SC GPS Stock Status Card */}
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            SC GPS Stock Status
          </span>
          <div className="space-y-2 divide-y divide-slate-100">
            {scStatuses.map((sc, idx) => (
              <div key={sc.name} className={`flex items-center justify-between text-xs ${idx > 0 ? "pt-2" : ""}`}>
                <span className="font-bold text-slate-800">{sc.name}</span>
                <div className="flex items-center gap-6">
                  <span className="text-slate-500 text-right min-w-[50px]">{sc.stock}</span>
                  <span className={`min-w-[65px] text-right text-xs ${sc.color}`}>{sc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width Red CTA Button */}
        <button
          type="button"
          onClick={handleOrder}
          className="w-full py-3 px-4 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors text-center"
        >
          Order GPS SIMs Now
        </button>

        {/* Bottom Dual Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Remind Me Later
          </button>
          <button
            type="button"
            onClick={handleOrder}
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </AppModal>
  );
};
