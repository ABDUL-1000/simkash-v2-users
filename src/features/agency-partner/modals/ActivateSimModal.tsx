import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { useGetUnactivatedSims, useVerifyCustomerForSim, useActivateDeviceSim } from "../api";
import type { ActivateSimResponseData, VerifyCustomerResponseData } from "../types/api";

export interface ActivationSimSelection { simNumber: string; simType: string; network: string }
export function ActivateSimModal({ open, onOpenChange, onActivated, initialSim }: { open: boolean; onOpenChange: (open: boolean) => void; onActivated?: () => void; initialSim?: ActivationSimSelection | null }) {
  const [simNumber, setSimNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [verification, setVerification] = useState<VerifyCustomerResponseData | null>(null);
  const [activated, setActivated] = useState<ActivateSimResponseData | null>(null);
  const { sims, isLoading: loadingSims } = useGetUnactivatedSims({ page: 1, limit: 100 });
  const verify = useVerifyCustomerForSim();
  const activate = useActivateDeviceSim();
  const selectedSim = useMemo(() => {
    const found = sims.find((sim) => sim.sim_number === simNumber);
    if (found || !initialSim || initialSim.simNumber !== simNumber) return found;
    return { sim_number: initialSim.simNumber, sim_type: initialSim.simType, network: initialSim.network };
  }, [sims, simNumber, initialSim]);

  useEffect(() => {
    if (open && initialSim?.simNumber) { setSimNumber(initialSim.simNumber); setVerification(null); }
  }, [open, initialSim]);

  const close = (value: boolean) => {
    if (!value) { setVerification(null); setActivated(null); setPin(""); setPhone(""); setSimNumber(""); verify.reset(); activate.reset(); }
    onOpenChange(value);
  };
  const handleVerify = async () => {
    if (!selectedSim || phone.length !== 11) return;
    try {
      const response = await verify.mutateAsync({ phone, sim_type: selectedSim.sim_type, sim_number: selectedSim.sim_number });
      setVerification(response.data);
    } catch { /* Mutation error is shown by its query client notification layer. */ }
  };
  const handleActivate = async () => {
    if (!selectedSim || !verification?.can_afford || pin.length !== 4) return;
    try {
      const response = await activate.mutateAsync({ sim_number: selectedSim.sim_number, phone, pin, sim_type: selectedSim.sim_type });
      setActivated(response.data);
      onActivated?.();
    } catch { /* Mutation notification explains the failure and leaves the form open. */ }
  };

  return <AppModal open={open} onOpenChange={close} title={activated ? "SIM Activated" : "Activate Customer SIM"} description={activated ? "The activation is complete." : "Verify the customer before confirming the activation."} size="md" footer={activated ? <button type="button" onClick={() => close(false)} className="w-full rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-white">Done</button> : null}>
    {activated ? <div className="space-y-4 text-center"><CheckCircle2 className="mx-auto size-12" style={{ color: colors.success }} /><p className="font-bold text-[#0F152A]">{activated.customer.fullname} is now active</p><div className="rounded-xl bg-[#F8FAFC] p-4 text-left text-xs"><p>SIM: <strong>{activated.sim_number}</strong></p><p className="mt-2">Reference: <strong>{activated.transaction_reference}</strong></p><p className="mt-2">Commission earned: <strong>₦{activated.partner_commission_earned.toLocaleString()}</strong></p><p className="mt-2">Activated: <strong>{new Date(activated.activated_at).toLocaleString()}</strong></p></div></div> : <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1 text-xs font-semibold text-[#0F152A]">SIM Type<select value={selectedSim?.sim_type ?? ""} onChange={(event) => { const found = sims.find((item) => item.sim_type === event.target.value); setSimNumber(found?.sim_number ?? (initialSim?.simType === event.target.value ? initialSim.simNumber : "")); setVerification(null); }} className="w-full rounded-xl border border-[#E2ECF6] bg-white p-3"><option value="">Select SIM type</option>{Array.from(new Set([...sims.map((sim) => sim.sim_type), ...(initialSim ? [initialSim.simType] : [])])).map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
        <label className="space-y-1 text-xs font-semibold text-[#0F152A]">Unactivated SIM<select value={simNumber} onChange={(event) => { setSimNumber(event.target.value); setVerification(null); }} disabled={loadingSims} className="w-full rounded-xl border border-[#E2ECF6] bg-white p-3"><option value="">{loadingSims ? "Loading SIMs…" : "Select available SIM"}</option>{initialSim && !sims.some((sim) => sim.sim_number === initialSim.simNumber) && <option value={initialSim.simNumber}>{initialSim.simNumber} · {initialSim.network}</option>}{sims.map((sim) => <option key={sim.id} value={sim.sim_number}>{sim.sim_number} · {sim.network}</option>)}</select></label></div>
      <label className="block space-y-1 text-xs font-semibold text-[#0F152A]">Customer phone<input value={phone} maxLength={11} inputMode="numeric" onChange={(event) => { setPhone(event.target.value.replace(/\D/g, "").slice(0, 11)); setVerification(null); }} placeholder="08012345678" className="w-full rounded-xl border border-[#E2ECF6] p-3" /></label>
      <button type="button" onClick={handleVerify} disabled={!simNumber || phone.length !== 11 || verify.isPending} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2563EB] py-3 text-sm font-bold text-[#2563EB] disabled:opacity-50"><Search className="size-4" />{verify.isPending ? "Verifying…" : "Verify Customer"}</button>
      {verification && <div className="space-y-3 rounded-xl border border-[#E2ECF6] p-4 text-xs"><div><p className="font-bold text-[#0F152A]">{verification.fullname}</p><p className="text-[#66738C]">{verification.email} · {verification.phone}</p></div><div className="flex justify-between"><span>Customer wallet</span><strong>₦{verification.wallet_balance.toLocaleString()}</strong></div><div className="flex justify-between"><span>SIM price</span><strong>₦{verification.sim_price.toLocaleString()}</strong></div>
        {verification.can_afford ? <p className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 font-semibold" style={{ color: colors.success }}><ShieldCheck className="size-4" />Eligible for activation</p> : <p className="flex items-center gap-2 rounded-lg bg-amber-50 p-2 font-semibold" style={{ color: colors.warning }}><AlertTriangle className="size-4" />Insufficient balance: short by ₦{verification.shortfall.toLocaleString()}.</p>}
        {verification.can_afford && <><p className="font-semibold text-[#66738C]">Enter your partner PIN to confirm</p><div className="flex justify-center"><InputOTP maxLength={4} value={pin} onChange={setPin}><InputOTPGroup className="gap-2">{[0,1,2,3].map((index) => <InputOTPSlot key={index} index={index} className="size-12 rounded-lg border border-[#E2ECF6]" />)}</InputOTPGroup></InputOTP></div><button type="button" onClick={handleActivate} disabled={pin.length !== 4 || activate.isPending} className="w-full rounded-xl bg-[#2563EB] py-3 text-sm font-bold text-white disabled:opacity-50">{activate.isPending ? "Activating…" : `Confirm Activation · ₦${verification.sim_price.toLocaleString()}`}</button></>}
      </div>}
    </div>}
  </AppModal>;
}
