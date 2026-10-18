import { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { useGetBanks, useVerifyBankAccount } from "../api";
import type { BankAccountDetails } from "../types";

interface BankAccountFieldsProps {
  /** Prefills bank and account number (e.g. the current payout account). */
  initial?: Partial<BankAccountDetails>;
  /** Receives the verified details, or undefined while the account is incomplete or unverified. */
  onChange: (details: BankAccountDetails | undefined) => void;
  disabled?: boolean;
  countryCode?: string;
}

const Label = ({ children }: { children: string }) => <span className="mb-1.5 block text-sm font-medium" style={{ color: APP_COLORS.texts.primary }}><span style={{ color: APP_COLORS.reds.red }}>* </span>{children}</span>;

/** Bank picker + account number with automatic OPay name verification. Shared by all dashboards' payout-account forms. */
export function BankAccountFields({ initial, onChange, disabled, countryCode }: BankAccountFieldsProps) {
  const [bankCode, setBankCode] = useState(initial?.bank_code);
  const [accountNumber, setAccountNumber] = useState(initial?.account_number ?? "");
  const banks = useGetBanks(countryCode);
  const verification = useVerifyBankAccount({ bank_code: bankCode, account_number: accountNumber });
  const bank = banks.data?.find(item => item.code === bankCode);
  const complete = Boolean(bankCode) && accountNumber.length === 10;
  const verified = complete && verification.data?.bank_code === bankCode && verification.data?.account_number === accountNumber ? verification.data : undefined;

  useEffect(() => {
    onChange(verified ? { ...verified, bank_name: bank?.name ?? initial?.bank_name ?? "" } : undefined);
    // onChange is a setter from the parent; re-run only when the verified result changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verified?.account_name, verified?.account_number, verified?.bank_code, bank?.name]);

  return <div className="space-y-4">
    <label className="block"><Label>Bank</Label>
      <Select size="large" className="w-full" showSearch optionFilterProp="label" placeholder={banks.isLoading ? "Loading banks…" : "Select your bank"} value={bankCode} disabled={disabled} loading={banks.isLoading}
        onChange={setBankCode} options={(banks.data ?? []).map(item => ({ value: item.code, label: item.name }))}
        notFoundContent={banks.error ? <div className="flex items-center justify-between gap-2 p-2 text-xs"><span>{banks.error.message}</span><Button size="small" onClick={() => void banks.refetch()}>Retry</Button></div> : "No bank found"} />
    </label>
    <label className="block"><Label>Account number</Label>
      <Input size="large" inputMode="numeric" maxLength={10} showCount placeholder="10-digit account number" value={accountNumber} disabled={disabled}
        onChange={event => setAccountNumber(event.target.value.replace(/\D/g, "").slice(0, 10))} />
    </label>
    {complete && (verification.isFetching
      ? <p className="flex items-center gap-2 rounded-xl p-3 text-xs" style={{ background: APP_COLORS.backgrounds.base, color: APP_COLORS.texts.slate }}><LoaderCircle className="size-4 animate-spin" /> Verifying account…</p>
      : verified ? <div className="flex items-center gap-3 rounded-xl border p-3" style={{ background: APP_COLORS.greens.light, borderColor: "#A7F3D0" }}>
          <CheckCircle2 className="size-5 shrink-0" style={{ color: APP_COLORS.greens.green }} />
          <div className="min-w-0"><p className="text-[11px] font-semibold uppercase" style={{ color: APP_COLORS.texts.muted }}>Account name</p><p className="truncate text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>{verified.account_name}</p></div>
        </div>
        : verification.error ? <div className="flex items-center gap-3 rounded-xl border p-3 text-xs" style={{ background: APP_COLORS.reds.light, borderColor: "#FECACA", color: APP_COLORS.reds.red }}>
          <XCircle className="size-4 shrink-0" /><span className="flex-1">{verification.error.message}</span><Button size="small" onClick={() => void verification.refetch()}>Retry</Button>
        </div> : null)}
  </div>;
}
