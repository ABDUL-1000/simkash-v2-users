import { useState } from "react";
import { Loader2, Search, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useGetUnactivatedSims, useVerifyCustomerForSim } from "../api";

/** A selected SIM + verified customer, handed to the confirm step. */
export interface ActivationFormData {
  simType: string;
  simTypeLabel: string;
  simNumber: string;
  network: string;
  customerName: string;
  phone: string;
  price: number;
  commission: number;
  customerWalletBalance: number;
  customerHasPin: boolean;
}

interface QuickActivateSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToConfirm?: (data: ActivationFormData) => void;
  /** Preselects a SIM (e.g. "Activate" on a stock row). Read when the modal mounts. */
  initialSim?: { simNumber: string; simType: string } | null;
}

const SIM_TYPES = [
  { key: "pos", label: "POS SIM" },
  { key: "cctv", label: "CCTV SIM" },
  { key: "gps", label: "GPS SIM" },
  { key: "router", label: "Router SIM" },
];

export function QuickActivateSimModal({
  open,
  onOpenChange,
  onProceedToConfirm,
  initialSim,
}: QuickActivateSimModalProps) {
  const [simType, setSimType] = useState(initialSim?.simType ?? "pos");
  const [simNumber, setSimNumber] = useState(initialSim?.simNumber ?? "");
  const [phone, setPhone] = useState("");
  const { sims, isLoading: loadingSims } = useGetUnactivatedSims({ type: simType, page: 1, limit: 100 });
  const verify = useVerifyCustomerForSim();
  const selectedSim = sims.find(sim => sim.sim_number === simNumber);
  const customer = verify.data?.data;
  const verifiedFor = verify.variables;
  const verified = Boolean(customer && verifiedFor?.phone === phone && verifiedFor?.sim_number === simNumber);

  const reset = () => { setSimNumber(""); setPhone(""); verify.reset(); };
  const close = (value: boolean) => { if (!value) reset(); onOpenChange(value); };

  const handleVerify = () => {
    if (!selectedSim || phone.length !== 11) return;
    verify.mutate({ phone, sim_type: simType, sim_number: selectedSim.sim_number });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSim || !customer || !verified || !customer.can_afford) return;
    onOpenChange(false);
    onProceedToConfirm?.({
      simType,
      simTypeLabel: selectedSim.type_label,
      simNumber: selectedSim.sim_number,
      network: selectedSim.network,
      customerName: customer.fullname,
      phone: customer.phone,
      price: customer.sim_price,
      commission: selectedSim.partner_commission,
      customerWalletBalance: customer.wallet_balance,
      customerHasPin: customer.has_pin,
    });
    reset();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={close}
      title="Quick Activate SIM"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* SIM Type */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">SIM Type</label>
          <select
            value={simType}
            onChange={(e) => { setSimType(e.target.value); setSimNumber(""); verify.reset(); }}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-bold"
          >
            {SIM_TYPES.map(type => <option key={type.key} value={type.key}>{type.label}</option>)}
          </select>
        </div>

        {/* SIM Number — from your unactivated stock (the network comes with the SIM) */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            SIM Number
          </label>
          <select
            value={simNumber}
            disabled={loadingSims}
            onChange={(e) => { setSimNumber(e.target.value); verify.reset(); }}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-mono disabled:opacity-60"
          >
            <option value="">{loadingSims ? "Loading your stock…" : sims.length ? "Select an available SIM" : "No SIMs of this type in stock"}</option>
            {sims.map(sim => <option key={sim.id} value={sim.sim_number}>{sim.sim_number} · {sim.network}</option>)}
          </select>
          {selectedSim && <p className="text-[10px] text-[#8C909B]">Network: <strong className="text-[#0F152A]">{selectedSim.network}</strong> · Commission ₦{selectedSim.partner_commission.toLocaleString()}</p>}
        </div>

        {/* Phone Number + verification */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Customer Phone Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 08012345678"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 11)); verify.reset(); }}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-mono"
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={!selectedSim || phone.length !== 11 || verify.isPending}
              className="shrink-0 rounded-2xl border border-[#2563EB] px-4 text-xs font-bold text-[#2563EB] hover:bg-[#EFF4F8] disabled:opacity-50 flex items-center gap-1.5"
            >
              {verify.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Search className="size-3.5" />}
              Verify
            </button>
          </div>
          {verify.error && <p className="text-[10px] font-bold text-[#EF4444]">{verify.error.message}</p>}
        </div>

        {/* Customer Name (from verification) */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Customer Name
          </label>
          <input
            type="text"
            readOnly
            placeholder="Filled after verification"
            value={verified ? customer?.fullname ?? "" : ""}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs text-[#0F152A] outline-none"
          />
        </div>

        {verified && customer && (
          <div className={`rounded-2xl border p-3 text-xs ${customer.can_afford ? "border-[#10B981]/30 bg-[#EBFFF8]" : "border-[#F59E0B]/30 bg-[#FEF3C7]/60"}`}>
            <div className="flex justify-between"><span className="text-[#66738C]">Price</span><strong className="text-[#0F152A]">₦{customer.sim_price.toLocaleString()}</strong></div>
            <div className="mt-1 flex justify-between"><span className="text-[#66738C]">Customer wallet</span><strong className="text-[#0F152A]">₦{customer.wallet_balance.toLocaleString()}</strong></div>
            <p className={`mt-2 flex items-center gap-1.5 font-bold ${customer.can_afford ? "text-[#10B981]" : "text-[#B45309]"}`}>
              <ShieldCheck className="size-3.5" />
              {customer.can_afford ? "Eligible for activation" : `Short by ₦${customer.shortfall.toLocaleString()} — the customer needs to top up.`}
            </p>
          </div>
        )}
        {/* Plan selection is not part of the activation API; the price comes from verification. */}

        {/* Action Buttons (Matching Image 2) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => close(false)}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!verified || !customer?.can_afford}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              Activate SIM
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
