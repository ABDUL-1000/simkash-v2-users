import { useState } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface SimSwapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  network?: string;
  simType?: string;
}

export function SimSwapModal({
  open,
  onOpenChange,
  simNumber = "07022222222",
  network = "MTN",
  simType = "POS SIM",
}: SimSwapModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [swapReason, setSwapReason] = useState<"network" | "lost">("network");
  const [newNetwork, setNewNetwork] = useState<string>("MTN");
  const [issueDescription, setIssueDescription] = useState("");

  // Lost SIM specific fields
  const [numberRetention, setNumberRetention] = useState<"keep" | "new">("keep");
  const [circumstances, setCircumstances] = useState("");

  // Step 3 PIN
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handleConfirmSwap = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      resetAll();
    }, 1000);
  };

  const resetAll = () => {
    setStep(1);
    setSwapReason("network");
    setPin("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={
        step === 1
          ? "SIM Swap"
          : step === 2
          ? `SIM Swap — ${swapReason === "network" ? "Network Issue" : "Lost SIM"}`
          : "SIM Swap — Confirm"
      }
      description={step === 1 ? "Select the reason for your swap request" : undefined}
      size="md"
    >
      <div className="space-y-5 pt-1">
        {/* Step Progress Bar for Steps 2 & 3 */}
        {step > 1 && (
          <div className="flex items-center justify-between text-xs font-bold text-[#8C909B] pb-2 border-b border-[#E2ECF6]">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <CheckCircle2 className="size-4" /> Reason
            </span>
            <span className={`flex items-center gap-1.5 ${step === 2 ? "text-[#2563EB]" : "text-[#10B981]"}`}>
              {step === 3 ? <CheckCircle2 className="size-4" /> : <span className="flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-[10px] text-white">2</span>}
              Configure
            </span>
            <span className={`flex items-center gap-1.5 ${step === 3 ? "text-[#2563EB]" : "opacity-50"}`}>
              <span className={`flex size-5 items-center justify-center rounded-full text-[10px] ${step === 3 ? "bg-[#2563EB] text-white" : "bg-[#E2ECF6] text-[#8C909B]"}`}>3</span>
              Confirm
            </span>
          </div>
        )}

        {/* STEP 1: Select Reason */}
        {step === 1 && (
          <>
            {/* SIM Card Card */}
            <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4">
              <div>
                <h4 className="text-base font-bold text-[#0F152A]">{simNumber}</h4>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded-full bg-[#FFCC00] px-2.5 py-0.5 text-[10px] font-extrabold text-[#0F152A]">
                    {network}
                  </span>
                  <span className="rounded-md border border-[#E2ECF6] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#66738C]">
                    {simType}
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-bold text-[#10B981]">
                Active
              </span>
            </div>

            {/* Info Notice */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF4F8] p-3.5 text-xs text-[#2563EB]">
              <Info className="size-4 shrink-0 mt-0.5 text-[#2563EB]" />
              <p>
                SIM swap is free of charge. Processing takes 24–48 hours. Your number will be retained.
              </p>
            </div>

            {/* Swap Reason Options */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                WHY DO YOU NEED A SWAP?
              </label>

              {/* Network Issue Option */}
              <div
                onClick={() => setSwapReason("network")}
                className={`cursor-pointer flex items-center gap-3.5 rounded-2xl border p-4 transition ${
                  swapReason === "network"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB] text-xl font-bold">
                  ≈
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">Network Issue</h4>
                  <p className="text-xs text-[#8C909B]">
                    Poor signal, wrong network registration or coverage problems
                  </p>
                </div>
              </div>

              {/* Lost / Stolen SIM Option */}
              <div
                onClick={() => setSwapReason("lost")}
                className={`cursor-pointer flex items-center gap-3.5 rounded-2xl border p-4 transition ${
                  swapReason === "lost"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#FFF7F8] text-[#EF4444] text-xl font-bold">
                  !
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">Lost / Stolen SIM</h4>
                  <p className="text-xs text-[#8C909B]">
                    Your SIM card has been lost or is in someone else's hands
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* STEP 2a: Network Issue Config */}
        {step === 2 && swapReason === "network" && (
          <>
            {/* Current SIM Card */}
            <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
              <div>
                <h4 className="text-sm font-bold text-[#0F152A]">{simNumber}</h4>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded-full bg-[#FFCC00] px-2 py-0.5 text-[10px] font-extrabold text-[#0F152A]">
                    {network}
                  </span>
                  <span className="rounded-md border border-[#E2ECF6] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#66738C]">
                    {simType}
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-xs font-bold text-[#10B981]">
                Active
              </span>
            </div>

            {/* New SIM Network Preference */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                NEW SIM NETWORK PREFERENCE
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "MTN", avatar: "M", bg: "bg-[#FFCC00] text-[#0F152A]" },
                  { id: "Airtel", avatar: "A", bg: "bg-[#E53333] text-white" },
                  { id: "Glo", avatar: "G", bg: "bg-[#10B981] text-white" },
                  { id: "T2", avatar: "T", bg: "bg-[#2563EB] text-white" },
                ].map((net) => {
                  const isSelected = newNetwork === net.id;
                  return (
                    <div
                      key={net.id}
                      onClick={() => setNewNetwork(net.id)}
                      className={`cursor-pointer flex items-center gap-3 rounded-2xl border p-3.5 transition ${
                        isSelected
                          ? "border-[#F59E0B] bg-[#FFFBEB]"
                          : "border-[#E2ECF6] bg-white hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`flex size-9 items-center justify-center rounded-full text-xs font-bold ${net.bg}`}
                      >
                        {net.avatar}
                      </div>
                      <span className="text-xs font-bold text-[#0F152A]">{net.id}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Describe Issue */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                DESCRIBE THE ISSUE (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="e.g. No signal for the past week in my area..."
                className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Swap Fee Note */}
            <div className="flex items-center justify-between rounded-2xl bg-[#EBFFF8] p-3.5 text-xs text-[#065F46]">
              <div>
                <span className="font-bold text-[#0F152A]">Swap Fee · Free</span>
                <p className="text-[11px] text-[#66738C]">No charge for this swap</p>
              </div>
              <span className="flex items-center gap-1 font-bold text-[#10B981]">
                <CheckCircle2 className="size-4" /> Eligible
              </span>
            </div>
          </>
        )}

        {/* STEP 2b: Lost SIM Config */}
        {step === 2 && swapReason === "lost" && (
          <>
            {/* Warning Banner */}
            <div className="flex items-start gap-2.5 rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-xs text-[#D9990D]">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <p>
                Your current SIM will be permanently deactivated immediately. The old SIM cannot be reactivated.
              </p>
            </div>

            {/* SIM Being Replaced */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                SIM BEING REPLACED
              </label>
              <div className="flex items-center justify-between rounded-2xl border border-[#FFF7F8] bg-[#FFF7F8] p-3.5">
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">{simNumber}</h4>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="rounded-full bg-[#FFCC00] px-2 py-0.5 text-[10px] font-extrabold text-[#0F152A]">
                      {network}
                    </span>
                    <span className="rounded-md border border-[#E2ECF6] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#66738C]">
                      {simType}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-xs font-bold text-[#10B981]">
                  Active
                </span>
              </div>
            </div>

            {/* Number Retention */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                NUMBER RETENTION
              </label>

              <div
                onClick={() => setNumberRetention("keep")}
                className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                  numberRetention === "keep"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#2563EB]">Keep My Number</h4>
                  <p className="text-[11px] text-[#66738C]">Same number {simNumber} on the new SIM</p>
                </div>
                <input
                  type="radio"
                  name="retention"
                  checked={numberRetention === "keep"}
                  onChange={() => setNumberRetention("keep")}
                  className="size-4 accent-[#2563EB]"
                />
              </div>

              <div
                onClick={() => setNumberRetention("new")}
                className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                  numberRetention === "new"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#0F152A]">Get a New Number</h4>
                  <p className="text-[11px] text-[#66738C]">Assign a new number to the replacement SIM</p>
                </div>
                <input
                  type="radio"
                  name="retention"
                  checked={numberRetention === "new"}
                  onChange={() => setNumberRetention("new")}
                  className="size-4 accent-[#2563EB]"
                />
              </div>
            </div>

            {/* Circumstances (Required) */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-[#0F152A]">Circumstances (required)</label>
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
                  Required
                </span>
              </div>
              <textarea
                rows={3}
                value={circumstances}
                onChange={(e) => setCircumstances(e.target.value)}
                placeholder="Describe how your SIM was lost or stolen..."
                className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Swap Fee Note */}
            <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] p-3 text-xs text-[#66738C]">
              <span>Swap Fee · Free (Lost/Stolen policy)</span>
              <span className="flex items-center gap-1 font-bold text-[#10B981]">
                <CheckCircle2 className="size-4" /> Free
              </span>
            </div>
          </>
        )}

        {/* STEP 3: Confirm with PIN */}
        {step === 3 && (
          <>
            {/* Details Receipt Card */}
            <div className="divide-y divide-[#E2ECF6] rounded-2xl border-2 border-[#2563EB]/40 bg-[#F8FAFC] p-4 text-xs">
              <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                <span className="text-[#8C909B]">Current SIM</span>
                <span className="font-bold text-[#0F152A]">{simNumber} · {network} · {simType}</span>
              </div>
              <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                <span className="text-[#8C909B]">Swap Reason</span>
                <span className="font-bold text-[#0F152A]">
                  {swapReason === "network" ? "Network Issue" : "Lost / Stolen SIM"}
                </span>
              </div>
              <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                <span className="text-[#8C909B]">New Network</span>
                <span className="font-bold text-[#0F152A]">{newNetwork}</span>
              </div>
              <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                <span className="text-[#8C909B]">Number</span>
                <span className="font-bold text-[#0F152A]">{simNumber} (retained)</span>
              </div>
              <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                <span className="text-[#8C909B]">Processing Time</span>
                <span className="font-bold text-[#0F152A]">24–48 hours</span>
              </div>
            </div>

            {/* Info Notice */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF4F8] p-3.5 text-xs text-[#2563EB]">
              <Info className="size-4 shrink-0 mt-0.5 text-[#2563EB]" />
              <p>
                Your current SIM will continue working until the swap is complete. You will receive an SMS notification.
              </p>
            </div>

            {/* Wallet PIN Input */}
            <div className="space-y-3 text-center">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                ENTER YOUR WALLET PIN TO CONFIRM
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={pin}
                  onChange={setPin}
                  containerClassName="gap-3"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot
                      index={0}
                      className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                    />
                    <InputOTPSlot
                      index={1}
                      className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                    />
                    <InputOTPSlot
                      index={2}
                      className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                    />
                    <InputOTPSlot
                      index={3}
                      className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={step === 1 ? handleClose : () => setStep((step - 1) as any)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            type="button"
            onClick={step === 3 ? handleConfirmSwap : handleNext}
            disabled={step === 3 && (pin.length < 4 || isLoading)}
            className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
          >
            {step === 3 ? (isLoading ? "Processing..." : "Confirm Swap") : "Continue →"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
