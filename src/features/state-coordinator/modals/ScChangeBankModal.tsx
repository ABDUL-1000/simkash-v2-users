import { useState } from "react";
import { Checkbox } from "antd";
import { AlertTriangle, Landmark } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { useScSavePayoutAccount } from "../api/mutations";

interface ScChangeBankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAccount?: { bankName: string; accountNumber: string; accountName: string };
  onSuccess?: (bankDetails: { bankName: string; accountNumber: string; accountName: string }) => void;
}

export function ScChangeBankModal({ open, onOpenChange, currentAccount, onSuccess }: ScChangeBankModalProps) {
  const save = useScSavePayoutAccount();
  const [details, setDetails] = useState<BankAccountDetails>();
  const [isDefault, setIsDefault] = useState(true);
  const close = () => { if (save.isPending) return; save.reset(); setDetails(undefined); onOpenChange(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details) return;
    save.mutate({ ...details, is_default: isDefault }, {
      onSuccess: () => {
        onSuccess?.({ bankName: details.bank_name, accountNumber: `****${details.account_number.slice(-4)}`, accountName: details.account_name });
        close();
      },
    });
  };

  return (
    <AppModal open={open} onOpenChange={value => { if (!value) close(); }} title="Change Bank Account" description="Update your payout account" size="md" showCloseButton={!save.isPending}>
      {open && <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {currentAccount && <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">CURRENT ACCOUNT</span>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]"><Landmark className="size-4" /></div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">{currentAccount.bankName} · {currentAccount.accountNumber}</h4>
              <p className="text-[11px] text-[#66738C]">{currentAccount.accountName}</p>
            </div>
          </div>
        </div>}

        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">ENTER NEW ACCOUNT DETAILS</span>
          {/* Bank list and account-name verification come from the shared OPay endpoints. */}
          <BankAccountFields onChange={setDetails} disabled={save.isPending} />
          <Checkbox checked={isDefault} disabled={save.isPending} onChange={event => setIsDefault(event.target.checked)}>Default payout account</Checkbox>
        </div>

        {save.error && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-[#EF4444] font-medium">{save.error.message}</div>}

        <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-[#D9990D] font-medium flex items-start gap-2.5">
          <AlertTriangle className="size-4 shrink-0 text-[#D9990D] mt-0.5" />
          <span>Your previous account is replaced once the new one is saved.</span>
        </div>
        {/* The PIN step was removed: POST /state-coordinator/wallet/payout-account has no PIN field, so it was never verified. */}

        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button type="button" onClick={close} disabled={save.isPending} className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={!details || save.isPending} className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50">
            {save.isPending ? "Saving…" : "Save New Account"}
          </button>
        </div>
      </form>}
    </AppModal>
  );
}
