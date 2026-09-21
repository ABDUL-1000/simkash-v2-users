import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { StateCoordinatorStock } from "../types";

interface ConfirmDistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc: StateCoordinatorStock | null;
  pos: number;
  cctv: number;
  gps: number;
  router: number;
  notes?: string;
  onConfirm: () => void;
}

export const ConfirmDistributionModal: React.FC<ConfirmDistributionModalProps> = ({
  open,
  onOpenChange,
  sc,
  pos = 200,
  cctv = 100,
  gps = 0,
  router = 50,
  onConfirm,
}) => {
  const [pin, setPin] = useState("");
  const totalSims = pos + cctv + gps + router;

  const scName = sc?.name || "Aminat Okafor";
  const scState = sc?.state || "Lagos";
  const scAps = sc?.apCount || 23;
  const scInitials = sc?.initials || "AO";

  const posBefore = sc?.onHandStock.pos ?? 847;
  const cctvBefore = sc?.onHandStock.cctv ?? 247;
  const routerBefore = sc?.onHandStock.router ?? 24;

  const handleConfirm = () => {
    if (pin.length < 4) return;
    onConfirm();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={
        <div className="space-y-0.5">
          <h3 className="text-xl font-bold text-slate-900">Confirm Distribution</h3>
          <p className="text-xs text-slate-500 font-normal">
            {scName} · {scState}
          </p>
        </div>
      }
      footer={null}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Recipient Dark Banner */}
        <div className="p-3.5 bg-[#1B365D] text-white rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/30 text-white font-bold text-sm flex items-center justify-center shrink-0">
            {scInitials}
          </div>
          <div>
            <div className="text-sm font-bold">{scName}</div>
            <div className="text-[11px] text-slate-300">
              {scState} · {scAps} APs
            </div>
          </div>
        </div>

        {/* Distributing Breakdown Card */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Distributing
          </span>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-slate-700">POS SIM</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">{pos}</span>
                <span className="text-[11px] text-slate-400">
                  {scName.split(" ")[0]} gets: {posBefore} &rarr; {posBefore + pos}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-slate-700">CCTV SIM</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">{cctv}</span>
                <span className="text-[11px] text-slate-400">
                  {scName.split(" ")[0]} gets: {cctvBefore} &rarr; {cctvBefore + cctv}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-slate-700">GPS SIM</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">{gps}</span>
                <span className="text-[11px] text-slate-400">No change</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-slate-700">Router SIM</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">{router}</span>
                <span className="text-[11px] text-slate-400">
                  {scName.split(" ")[0]} gets: {routerBefore} &rarr; {routerBefore + router}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm">
            <span className="text-slate-900">Total distributed:</span>
            <span className="text-emerald-600">{totalSims} SIMs</span>
          </div>

          <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-lg flex items-center gap-2 text-emerald-800 text-[11px]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Distribution uses existing inventory. No payment required.</span>
          </div>
        </div>

        {/* EP Inventory Remaining After */}
        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            EP Inventory Remaining After
          </span>
          <div className="space-y-1.5 text-slate-600 font-medium">
            <div className="flex justify-between">
              <span>POS SIM</span>
              <span className="text-slate-700">5,000 &rarr; {(5000 - pos).toLocaleString()} (-{pos})</span>
            </div>
            <div className="flex justify-between">
              <span>CCTV SIM</span>
              <span className="text-slate-700">1,200 &rarr; {(1200 - cctv).toLocaleString()} (-{cctv})</span>
            </div>
            <div className="flex justify-between">
              <span>Router SIM</span>
              <span className="text-slate-700">597 &rarr; {(597 - router).toLocaleString()} (-{router})</span>
            </div>
          </div>
        </div>

        {/* SMS notification banner */}
        <div className="p-2.5 bg-blue-50/60 border border-blue-100 rounded-lg text-blue-700 text-xs text-center font-medium">
          {scName} will receive SMS notification
        </div>

        {/* Enter Transaction PIN */}
        <div className="space-y-2 text-center pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Enter Transaction PIN
          </span>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full inline-flex items-center justify-center gap-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pin.length < 4}
            className="w-full inline-flex items-center justify-center gap-1 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors"
          >
            <span>Distribute to {scName.split(" ")[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </AppModal>
  );
};
