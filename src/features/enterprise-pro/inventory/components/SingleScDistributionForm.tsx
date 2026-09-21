import React, { useState } from "react";
import { ShieldCheck, UserCheck, AlertCircle } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { SimQuantityStepperInput } from "./SimQuantityStepperInput";
import type { StateCoordinatorStock, SimStockItem } from "../types";

interface SingleScDistributionFormProps {
  coordinators: StateCoordinatorStock[];
  stockItems: SimStockItem[];
  selectedScId?: string;
  onSubmit: (payload: {
    sc: StateCoordinatorStock;
    pos: number;
    cctv: number;
    gps: number;
    router: number;
    notes: string;
    pin: string;
  }) => void;
}

export const SingleScDistributionForm: React.FC<SingleScDistributionFormProps> = ({
  coordinators,
  stockItems,
  selectedScId,
  onSubmit,
}) => {
  const [scId, setScId] = useState(selectedScId || coordinators[0]?.id || "");
  const [pos, setPos] = useState(500);
  const [cctv, setCctv] = useState(150);
  const [gps, setGps] = useState(50);
  const [router, setRouter] = useState(100);
  const [notes, setNotes] = useState("Q2 State replenishment batch");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const activeScs = coordinators.filter((sc) => sc.status === "active");
  const currentSc = coordinators.find((c) => c.id === scId) || activeScs[0];

  const posStock = stockItems.find((s) => s.id === "POS")?.inStock || 5000;
  const cctvStock = stockItems.find((s) => s.id === "CCTV")?.inStock || 1200;
  const gpsStock = stockItems.find((s) => s.id === "GPS")?.inStock || 450;
  const routerStock = stockItems.find((s) => s.id === "ROUTER")?.inStock || 597;

  const totalSims = pos + cctv + gps + router;
  const totalValue = pos * 2500 + cctv * 6000 + gps * 8000 + router * 5000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSc) return;
    if (totalSims <= 0) {
      setError("Please specify at least 1 SIM card to distribute.");
      return;
    }
    if (pin.length < 4) {
      setError("Please enter your complete 4-digit security PIN.");
      return;
    }
    setError("");
    onSubmit({ sc: currentSc, pos, cctv, gps, router, notes, pin });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <div className="p-5 bg-white rounded-xl border space-y-4" style={{ borderColor: colors.border }}>
          <label className="block text-sm font-bold text-slate-900">
            Select Recipient State Coordinator
          </label>
          <select
            value={scId}
            onChange={(e) => setScId(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
          >
            {activeScs.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name} — {sc.state} State ({sc.zone}) · On-Hand: {sc.onHandStock.total} SIMs
              </option>
            ))}
          </select>

          {currentSc && (
            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800">{currentSc.name}</span>
                <span className="text-slate-500">({currentSc.phone})</span>
              </div>
              <span className="text-slate-600 font-medium">
                Current On-Hand: <strong className="text-blue-700">{currentSc.onHandStock.total} SIMs</strong>
              </span>
            </div>
          )}
        </div>

        <div className="p-5 bg-white rounded-xl border space-y-4" style={{ borderColor: colors.border }}>
          <h4 className="text-sm font-bold text-slate-900">Specify SIM Quantities to Allocate</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SimQuantityStepperInput label="POS SIMs" pricePerUnit={2500} availableStock={posStock} value={pos} onChange={setPos} step={50} />
            <SimQuantityStepperInput label="CCTV SIMs" pricePerUnit={6000} availableStock={cctvStock} value={cctv} onChange={setCctv} step={25} />
            <SimQuantityStepperInput label="GPS SIMs" pricePerUnit={8000} availableStock={gpsStock} value={gps} onChange={setGps} step={10} isCritical />
            <SimQuantityStepperInput label="Router SIMs" pricePerUnit={5000} availableStock={routerStock} value={router} onChange={setRouter} step={10} />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-slate-700">Dispatch Notes / Purpose</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Q2 restock for agency partners"
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="p-5 bg-white rounded-xl border space-y-4 h-fit" style={{ borderColor: colors.border }}>
        <h4 className="text-sm font-bold text-slate-900 border-b pb-3" style={{ borderColor: colors.border }}>
          Distribution Summary & PIN
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Recipient:</span>
            <strong className="text-slate-900">{currentSc?.name}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Destination:</span>
            <span className="font-semibold text-slate-800">{currentSc?.state} State</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Total Units:</span>
            <strong className="text-blue-600 font-bold">{totalSims.toLocaleString()} SIMs</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Asset Value:</span>
            <strong className="text-slate-900">₦{totalValue.toLocaleString()}</strong>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] space-y-1 text-slate-600">
          <div className="font-semibold text-slate-800">Remaining Enterprise Reserves:</div>
          <div>POS: {(posStock - pos).toLocaleString()} · CCTV: {(cctvStock - cctv).toLocaleString()}</div>
          <div>GPS: {(gpsStock - gps).toLocaleString()} · Router: {(routerStock - router).toLocaleString()}</div>
        </div>

        <div className="space-y-2 pt-2 border-t" style={{ borderColor: colors.border }}>
          <label className="block text-xs font-semibold text-slate-800 text-center">
            Enter 4-Digit Security PIN to Authorize
          </label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={(val) => setPin(val)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={totalSims <= 0 || pin.length < 4}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Authorize & Distribute {totalSims > 0 ? `(${totalSims} SIMs)` : ""}</span>
        </button>
      </div>
    </form>
  );
};
