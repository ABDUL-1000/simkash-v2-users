import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface RecipientItem {
  id: string;
  phone: string;
  network: string;
  amount: number;
  label: string;
  isValid: boolean;
}

interface BulkAirtimeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkAirtimeModal({ open, onOpenChange }: BulkAirtimeModalProps) {
  const [network, setNetwork] = useState<string>("MTN");
  const [defaultAmount, setDefaultAmount] = useState<string>("500");
  const [inputTab, setInputTab] = useState<"manual" | "csv">("manual");
  const [batchLabel, setBatchLabel] = useState<string>("Staff Airtime June 2026");

  // Input row fields
  const [inputPhone, setInputPhone] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>("500");
  const [inputLabel, setInputLabel] = useState<string>("");

  // Recipient list initialized with dummy items from reference image
  const [recipients, setRecipients] = useState<RecipientItem[]>([
    { id: "1", phone: "08065942373", network: "MTN", amount: 500, label: "Chidi", isValid: true },
    { id: "2", phone: "09122222222", network: "Airtel", amount: 500, label: "Amina", isValid: true },
    { id: "3", phone: "08120600542", network: "Glo", amount: 1000, label: "Ibrahim", isValid: true },
    { id: "4", phone: "07055093537", network: "MTN", amount: 500, label: "Fatima", isValid: true },
    { id: "5", phone: "0812345", network: "—", amount: 0, label: "Invalid", isValid: false },
  ]);

  // Step state: "configure" (1) -> "preview" (2) -> "confirm" (3) -> "success" | "failure"
  const [wizardStep, setWizardStep] = useState<"configure" | "preview" | "confirm" | "success" | "failure">("configure");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddRecipient = () => {
    if (!inputPhone) return;
    const isValid = inputPhone.length >= 10;
    const newItem: RecipientItem = {
      id: crypto.randomUUID(),
      phone: inputPhone,
      network: isValid ? network : "—",
      amount: isValid ? Number(inputAmount || defaultAmount) : 0,
      label: inputLabel || (isValid ? "Staff" : "Invalid"),
      isValid,
    };
    setRecipients([...recipients, newItem]);
    setInputPhone("");
    setInputLabel("");
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients(recipients.filter((r) => r.id !== id));
  };

  const validRecipients = recipients.filter((r) => r.isValid);
  const invalidRecipients = recipients.filter((r) => !r.isValid);
  const totalCost = validRecipients.reduce((sum, r) => sum + r.amount, 0);

  const handleConfirmPay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (pin === "0000") {
        setWizardStep("failure");
      } else {
        setWizardStep("success");
      }
    }, 1000);
  };

  const resetAll = () => {
    setWizardStep("configure");
    setPin("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  // Confirm Details mapping
  const confirmDetails: ConfirmDetailItem[] = [
    { label: "Batch Label", value: batchLabel || "Bulk Airtime Batch" },
    { label: "Total Recipients", value: `${validRecipients.length} valid numbers` },
    { label: "Total Cost", value: `₦${totalCost.toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "Balance after", value: `₦${(50000 - totalCost).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Batch Label", value: batchLabel || "Bulk Airtime Batch" },
    { label: "Processed Numbers", value: `${validRecipients.length} numbers` },
    { label: "Total Amount", value: `₦${totalCost.toLocaleString()}` },
    { label: "Batch Ref", value: "BLK-2026-008478" },
  ];

  return (
    <>
      {/* 1. Step 1: Configure & Add Numbers */}
      <AppModal
        open={open && wizardStep === "configure"}
        onOpenChange={handleClose}
        title="Bulk Airtime"
        description="Step 1 of 3 — Configure & Add Numbers"
        size="lg"
      >
        <div className="space-y-5 pt-1">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-[#8C909B] pb-2 border-b border-[#E2ECF6]">
            <span className="flex items-center gap-1.5 text-[#2563EB]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-[10px] text-white">1</span>
              Configure
            </span>
            <span className="flex items-center gap-1.5 opacity-50">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#E2ECF6] text-[10px] text-[#8C909B]">2</span>
              Preview
            </span>
            <span className="flex items-center gap-1.5 opacity-50">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#E2ECF6] text-[10px] text-[#8C909B]">3</span>
              Confirm
            </span>
          </div>

          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💳</span>
            <span>Wallet Balance · ₦50,000.00</span>
          </div>

          {/* Network Chips */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              NETWORK
            </label>
            <div className="flex flex-wrap gap-2.5">
              {["MTN", "Airtel", "Glo", "9mobile"].map((net) => {
                const isSelected = network === net;
                return (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setNetwork(net)}
                    className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                      isSelected
                        ? "bg-[#2563EB] text-white"
                        : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {net}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Default Amount */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              DEFAULT AMOUNT PER NUMBER
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#0F152A]">
                ₦
              </span>
              <input
                type="number"
                value={defaultAmount}
                onChange={(e) => setDefaultAmount(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] py-2.5 pl-8 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            <p className="text-[11px] text-[#8C909B]">
              Amount each recipient will receive. Individual amounts can be set per number below.
            </p>
          </div>

          {/* Input Method Toggle Tabs */}
          <div className="space-y-3">
            <div className="flex rounded-xl bg-[#F8FAFC] p-1 border border-[#E2ECF6]">
              <button
                type="button"
                onClick={() => setInputTab("manual")}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                  inputTab === "manual"
                    ? "bg-white text-[#2563EB] shadow-xs"
                    : "text-[#8C909B]"
                }`}
              >
                Manual Entry
              </button>
              <button
                type="button"
                onClick={() => setInputTab("csv")}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                  inputTab === "csv"
                    ? "bg-white text-[#2563EB] shadow-xs"
                    : "text-[#8C909B]"
                }`}
              >
                CSV Upload
              </button>
            </div>

            {/* Manual Entry Inputs */}
            {inputTab === "manual" && (
              <div className="space-y-2 rounded-2xl border border-[#E2ECF6] p-3.5 bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    className="flex-1 rounded-xl border border-[#E2ECF6] bg-white py-2 px-3 text-xs font-bold text-[#0F152A] outline-none"
                  />
                  <div className="relative w-28">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#0F152A]">
                      ₦
                    </span>
                    <input
                      type="number"
                      value={inputAmount}
                      onChange={(e) => setInputAmount(e.target.value)}
                      className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2 pl-6 pr-2 text-xs font-bold text-[#0F152A] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddRecipient}
                    className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Staff Name / Label (optional)"
                  value={inputLabel}
                  onChange={(e) => setInputLabel(e.target.value)}
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2 px-3 text-xs text-[#0F152A] outline-none"
                />
              </div>
            )}
          </div>

          {/* Numbers Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
            <table className="w-full min-w-[500px] text-left text-xs">
              <thead className="bg-[#F8FAFC] font-bold text-[#8C909B] border-b border-[#E2ECF6]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">PHONE</th>
                  <th className="py-2.5 px-3">NETWORK</th>
                  <th className="py-2.5 px-3">AMOUNT</th>
                  <th className="py-2.5 px-3">LABEL</th>
                  <th className="py-2.5 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECF6]">
                {recipients.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC]">
                    <td className="py-2 px-3 text-[#8C909B] font-medium">{idx + 1}</td>
                    <td className={`py-2 px-3 font-bold ${!item.isValid ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                      {item.phone}
                    </td>
                    <td className="py-2 px-3">
                      {item.isValid ? (
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            item.network === "MTN"
                              ? "bg-[#FFCC00] text-[#0F152A]"
                              : item.network === "Airtel"
                              ? "bg-[#E53333] text-white"
                              : "bg-[#10B981] text-white"
                          }`}
                        >
                          {item.network}
                        </span>
                      ) : (
                        <span className="text-[#8C909B]">—</span>
                      )}
                    </td>
                    <td className="py-2 px-3 font-bold text-[#0F152A]">
                      {item.isValid ? `₦${item.amount.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-2 px-3">
                      {item.isValid ? (
                        <span className="text-[#66738C]">{item.label}</span>
                      ) : (
                        <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
                          Invalid
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveRecipient(item.id)}
                        className="text-[#8C909B] hover:text-[#EF4444]"
                      >
                        <X className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Batch Label */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              BATCH LABEL (OPTIONAL)
            </label>
            <input
              type="text"
              value={batchLabel}
              onChange={(e) => setBatchLabel(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] py-2.5 px-4 text-xs font-bold text-[#0F152A] outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setWizardStep("preview")}
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Preview <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </AppModal>

      {/* 2. Step 2: Preview & Validate */}
      <AppModal
        open={open && wizardStep === "preview"}
        onOpenChange={handleClose}
        title="Bulk Airtime"
        description="Step 2 of 3 — Preview & Validate"
        size="lg"
      >
        <div className="space-y-5 pt-1">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-[#8C909B] pb-2 border-b border-[#E2ECF6]">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <CheckCircle2 className="size-4" /> Configure
            </span>
            <span className="flex items-center gap-1.5 text-[#2563EB]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-[10px] text-white">2</span>
              Preview
            </span>
            <span className="flex items-center gap-1.5 opacity-50">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#E2ECF6] text-[10px] text-[#8C909B]">3</span>
              Confirm
            </span>
          </div>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3">
              <span className="text-xl font-extrabold text-[#10B981]">{validRecipients.length}</span>
              <p className="text-[11px] font-semibold text-[#8C909B]">Valid</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3">
              <span className="text-xl font-extrabold text-[#EF4444]">{invalidRecipients.length}</span>
              <p className="text-[11px] font-semibold text-[#8C909B]">Invalid</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3">
              <span className="text-xl font-extrabold text-[#8C909B]">0</span>
              <p className="text-[11px] font-semibold text-[#8C909B]">Duplicates</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3">
              <span className="text-xs font-extrabold text-[#0F152A]">MTN·Airtel·Glo</span>
              <p className="text-[11px] font-semibold text-[#8C909B]">Networks</p>
            </div>
          </div>

          {/* Network Cost Breakdown & Projection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
              <h4 className="font-bold text-[#8C909B] uppercase tracking-wider text-[10px]">
                Network cost breakdown
              </h4>
              <div className="flex justify-between text-[#0F152A]">
                <span>MTN (3 numbers)</span>
                <span className="font-bold">₦1,500</span>
              </div>
              <div className="flex justify-between text-[#0F152A]">
                <span>Airtel (1 number)</span>
                <span className="font-bold">₦500</span>
              </div>
              <div className="flex justify-between text-[#0F152A]">
                <span>Glo (1 number)</span>
                <span className="font-bold">₦1,000</span>
              </div>
              <div className="border-t border-[#E2ECF6] pt-2 flex justify-between font-extrabold text-sm text-[#0F152A]">
                <span>Total</span>
                <span className="text-[#10B981]">₦{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
              <h4 className="font-bold text-[#8C909B] uppercase tracking-wider text-[10px]">
                Balance Projection
              </h4>
              <div className="flex justify-between text-[#0F152A]">
                <span>Current balance</span>
                <span className="font-bold">₦50,000</span>
              </div>
              <div className="flex justify-between text-[#EF4444]">
                <span>This batch</span>
                <span className="font-bold">-₦{totalCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-[#E2ECF6] pt-2 flex justify-between font-extrabold text-sm text-[#0F152A]">
                <span>After send</span>
                <span className="text-[#10B981]">₦{(50000 - totalCost).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Invalid Number Warning Banner */}
          {invalidRecipients.length > 0 && (
            <div className="flex items-center justify-between rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs text-[#D9990D]">
              <span>● {invalidRecipients.length} invalid number will be skipped: 0812345 — Invalid format</span>
              <button type="button" className="font-bold text-[#2563EB] hover:underline flex items-center gap-1">
                Download error list <ArrowRight className="size-3" />
              </button>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWizardStep("configure")}
                className="flex items-center gap-1 rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                <Download className="size-3.5" /> Download Errors
              </button>
            </div>
            <button
              type="button"
              onClick={() => setWizardStep("confirm")}
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Confirm & Send <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </AppModal>

      {/* 3. Reusable Confirm Modal with PIN */}
      <TransactionConfirmModal
        open={open && wizardStep === "confirm"}
        onOpenChange={handleClose}
        title="Confirm Bulk Airtime Purchase"
        subtitle="Review batch parameters before final execution"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setWizardStep("preview")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Send Batch ₦${totalCost.toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 4. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && wizardStep === "success"}
        onOpenChange={handleClose}
        title="Bulk Airtime Sent!"
        subtitle={`Successfully dispatched airtime to ${validRecipients.length} valid numbers`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 - totalCost).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 5. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && wizardStep === "failure"}
        onOpenChange={handleClose}
        title="Batch Send Failed"
        subtitle="We couldn't process the bulk airtime batch. Your wallet was not debited."
        reason="Network gateway connection failure. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setWizardStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
