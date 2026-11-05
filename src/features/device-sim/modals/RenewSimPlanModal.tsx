import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRenewDeviceSim } from "../api/useRenewDeviceSim";
import type { DeviceSimItem } from "../types/api";

// Only a 1-year renewal is offered for now. The API charges the fee, so no amount is shown here.
const plans = [{ duration: "1_year", label: "1 Year", data: "12 months of service" }];

export function RenewSimPlanModal({ open, sim, balance = 0, onClose }: { open: boolean; sim: DeviceSimItem | null; balance?: number; onClose: () => void }) {
  const [selected, setSelected] = useState(plans[0]);
  const [pin, setPin] = useState("");
  const renew = useRenewDeviceSim({ onSuccess: () => { setPin(""); onClose(); } });
  const close = () => { setPin(""); setSelected(plans[0]); onClose(); };
  const submit = () => { if (!sim) return; renew.mutate({ sim_type: sim.sim_type, sim_number: sim.sim_number, duration: selected.duration, pin }); };
  return <AppModal open={open} onOpenChange={(value) => !value && close()} title="Renew SIM Plan" description={sim ? `${sim.sim_number} · ${sim.network} · ${sim.typeLabel || sim.sim_type}` : "Choose a renewal plan"} size="md">
    <div className="space-y-4"><div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-[#EF4444]">Expires in {sim?.daysLeft ?? "—"} days · {sim?.status === "expiring" ? "Expiring Soon" : "Current plan"}</div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#8C909B]">Select plan duration</p>
      {plans.map((plan) => <button key={plan.duration} type="button" onClick={() => setSelected(plan)} className={`flex w-full items-center justify-between rounded-xl border p-3 text-left ${selected.duration === plan.duration ? "border-[#2563EB] bg-blue-50" : "border-[#E2ECF6]"}`}><span><b className="block text-sm">{plan.label}</b><small className="text-xs text-[#8C909B]">{plan.data}</small></span></button>)}
      <div className="rounded-xl bg-slate-50 p-3 text-xs">Pay from · Wallet <span className="float-right font-semibold">₦{balance.toLocaleString()}</span></div>
      <div className="rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">The renewal fee will be deducted from your wallet.</div>
      <label className="block text-[10px] font-bold uppercase tracking-wide text-[#8C909B]">Enter PIN to confirm</label><div className="flex justify-center"><InputOTP maxLength={4} value={pin} onChange={setPin} inputMode="numeric"><InputOTPGroup className="gap-2"><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /><InputOTPSlot index={3} /></InputOTPGroup></InputOTP></div>
      <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3"><button type="button" onClick={close} className="rounded-lg border border-[#E2ECF6] px-4 py-2 text-xs">Cancel</button><button type="button" disabled={!sim || pin.length !== 4 || renew.isPending} onClick={submit} className="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">{renew.isPending ? "Renewing…" : `Renew Now · ${selected.label}`}</button></div>
    </div>
  </AppModal>;
}
