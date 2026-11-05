import { useState } from "react";
import { Popconfirm } from "antd";
import { Check, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useDeleteBankAccount } from "@/features/payout/api";
import { useGetUserProfile } from "../api/useGetUserProfile";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { ChangeBankAccountModal } from "../Modals/ChangeBankAccountModal";

export function BankAccountTab() {
  const { bankAccounts, isLoading } = useGetUserProfile();
  const [changeBankOpen, setChangeBankOpen] = useState(false);
  const removeAccount = useDeleteBankAccount();

  const defaultAccount = bankAccounts.find((acc) => acc.is_default) || bankAccounts[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Card 1: Saved Bank Accounts */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0F152A]">Saved Bank Account</h3>
            {isLoading && <RefreshCw className="size-3.5 text-blue-600 animate-spin" />}
          </div>
          {bankAccounts.length > 0 && (
            <button
              type="button"
              onClick={() => setChangeBankOpen(true)}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Change Account
            </button>
          )}
        </div>

        {bankAccounts.length === 0 ? (
          <div className="py-4">
            <AppEmptyState
              title="No Bank Account Linked"
              description="Add a verified bank account to receive automated commission payouts and instant wallet withdrawals."
              actionText="Add Bank Account"
              onAction={() => setChangeBankOpen(true)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {bankAccounts.map((account) => {
              const initials = account.bank_name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "BA";

              return (
                <div
                  key={account.id}
                  className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-full bg-[#10B981] text-white font-bold text-sm shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-[#0F152A] text-sm truncate">
                            {account.bank_name}
                          </h4>
                          {account.is_default && (
                            <span className="rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8C909B] truncate">
                          {account.account_number} · {account.account_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <span className="rounded-full bg-[#EBFFF8] px-3 py-0.5 text-xs font-bold text-[#10B981] flex items-center gap-1">
                        <Check className="size-3" />{" "}
                        {account.status === "active" ? "Verified" : account.status}
                      </span>
                      {/* DELETE /user/wallet/bank-accounts/{id} */}
                      <Popconfirm title="Remove this bank account?" description="It will no longer be available for payouts." okText="Remove" okButtonProps={{ danger: true, loading: removeAccount.isPending }} onConfirm={() => removeAccount.mutateAsync(account.id).catch(() => undefined)}>
                        <button type="button" aria-label={`Remove ${account.bank_name} account`} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#EF4444] hover:bg-red-50">
                          <Trash2 className="size-3.5" /> Remove
                        </button>
                      </Popconfirm>
                    </div>
                  </div>

                  <div className="border-t border-[#E2ECF6] pt-3 text-xs space-y-0.5">
                    <span className="font-bold text-[#0F152A] block">
                      Payout & Withdrawal Routing
                    </span>
                    <p className="text-[#8C909B]">
                      This account is verified and receives all commission payouts and direct wallet withdrawals.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Card 2: Withdrawal Settings */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Withdrawal Settings</h3>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white text-xs">
          <div className="flex justify-between p-3.5 px-4">
            <span className="text-[#8C909B]">Minimum withdrawal</span>
            <span className="font-extrabold text-[#0F152A]">₦1,000</span>
          </div>

          <div className="flex justify-between p-3.5 px-4">
            <span className="text-[#8C909B]">Processing time</span>
            <span className="font-extrabold text-[#0F152A]">Instant (0–5 mins)</span>
          </div>

          <div className="flex justify-between p-3.5 px-4">
            <span className="text-[#8C909B]">Daily limit</span>
            <span className="font-extrabold text-[#0F152A]">₦5,000,000</span>
          </div>
        </div>
      </div>

      {/* Button: Add / Change Bank Account */}
      <button
        type="button"
        onClick={() => setChangeBankOpen(true)}
        className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3.5 text-xs font-bold text-[#2563EB] shadow-xs hover:bg-slate-50 flex items-center justify-center gap-2 transition"
      >
        <Plus className="size-4" /> Add or Change Bank Account
      </button>

      {/* Change Bank Account Modal */}
      <ChangeBankAccountModal
        open={changeBankOpen}
        onOpenChange={setChangeBankOpen}
        currentBank={
          defaultAccount
            ? `${defaultAccount.bank_name} · ${defaultAccount.account_number}`
            : undefined
        }
        accountName={defaultAccount?.account_name}
      />
    </div>
  );
}
