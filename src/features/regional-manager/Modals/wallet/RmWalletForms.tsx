import { useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import { Landmark } from "lucide-react";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { useRequestRmPayout, useSaveRmPayoutAccount } from "../../api/wallet";
import type { RmPayoutAccountData } from "../../types/wallet";
import type { RmBankPayload, RmWalletPayoutPayload } from "../../types/territory";
import { RmDesignModal, RmConfirmed } from "../dashboard/RmDesignModal";
function BankSummary({ account }: { account: RmPayoutAccountData }) {
  return <div className="flex gap-3 rounded-xl p-3 text-xs" style={{ background: colors.backgrounds.base }}><Landmark size={20} /><div><strong>{account.bank_name} · {account.account_number_masked}</strong><p className="mt-1" style={{ color: colors.texts.muted }}>{account.account_name} · {account.is_verified ? "Verified" : "Pending verification"}</p></div></div>;
}
export function RmWalletPayoutModal({ balance, account, onClose, onBank }: { balance: number; account: RmPayoutAccountData; onClose: () => void; onBank: () => void }) {
  const [form] = Form.useForm<RmWalletPayoutPayload>();
  const amount = Form.useWatch("amount", form) as number | undefined;
  const mutation = useRequestRmPayout();
  const [receipt, setReceipt] = useState<{ message: string; data: unknown } | null>(null);
  const [submittedAmount, setSubmittedAmount] = useState(0);
  const money = (value: number) => `₦${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  if (receipt) return <RmConfirmed title="Payout Requested!" result={receipt} rows={[{ label: "Amount", value: money(submittedAmount) }, { label: "Bank", value: `${account.bank_name} · ${account.account_number_masked}` }]} onClose={onClose} />;
  return <RmDesignModal title="Request Payout" subtitle="Withdraw your commission earnings" pending={mutation.isPending} error={mutation.error} onClose={onClose} onSubmit={() => form.submit()} submitLabel={mutation.isPending ? "Processing request…" : "Request Payout"} submitColor={colors.warning}>
    <div className="rounded-xl p-4" style={{ background: colors.greens.light, color: colors.success }}><p className="text-[10px] uppercase">Available to withdraw</p><strong className="text-2xl">{money(balance)}</strong><p className="text-xs">Network commission</p></div>
    <BankSummary account={account} /><Button type="text" onClick={onBank} disabled={mutation.isPending}>Change bank account</Button>
    <Form form={form} layout="vertical" disabled={mutation.isPending} onFinish={values => { if (account.is_verified) mutation.mutate(values, { onSuccess: result => { setSubmittedAmount(values.amount); form.resetFields(); setReceipt(result); } }); }}>
      <Form.Item name="amount" label="Withdrawal amount" rules={[{ required: true }, { type: "number", min: 0.01, max: balance, message: "Enter an amount within your available commission." }]}><InputNumber prefix="₦" min={0.01} max={balance} precision={2} size="large" className="!w-full" /></Form.Item>
      <div className="mb-4 flex flex-wrap gap-2">{[50000, 100000, 150000].filter(value => value < balance).map(value => <Button size="small" key={value} onClick={() => form.setFieldValue("amount", value)}>{money(value)}</Button>)}<Button size="small" onClick={() => form.setFieldValue("amount", balance)}>Full balance</Button></div>
      {typeof amount === "number" && amount > 0 && amount <= balance && <p className="mb-4 text-xs" style={{ color: colors.texts.muted }}>Wallet after withdrawal: {money(balance - amount)}</p>}
      {/* Minimum payout, approval thresholds, attempt counts and processing-time promises are commented out: they are not provided by the API contract. */}
      <Form.Item name="pin" label="Enter PIN to confirm" rules={[{ required: true }, { pattern: /^\d{4}$/, message: "Enter all four PIN digits." }]}>
        <InputOTP maxLength={4} type="password" inputMode="numeric" pattern="^[0-9]*$" autoComplete="off" disabled={mutation.isPending} aria-label="Transaction PIN" render={({ slots }) => <InputOTPGroup>{slots.map((slot, index) => <div key={index} className="flex size-12 items-center justify-center rounded-lg border text-xl" style={{ borderColor: slot.isActive ? colors.primary : colors.border }}>{slot.char ? "•" : ""}</div>)}</InputOTPGroup>} />
      </Form.Item>
    </Form>
  </RmDesignModal>;
}
export function RmPayoutAccountModal({ account, onClose }: { account?: RmPayoutAccountData | null; onClose: () => void }) {
  const [form] = Form.useForm<RmBankPayload>();
  const mutation = useSaveRmPayoutAccount();
  const [receipt, setReceipt] = useState<{ message: string; data: unknown } | null>(null);
  const initialValues = account ? { bank_name: account.bank_name, bank_code: account.bank_code, account_number: account.account_number, account_name: account.account_name, is_default: account.is_default } : { is_default: true };
  if (receipt) {
    const saved = receipt.data && typeof receipt.data === "object" ? receipt.data as Partial<RmPayoutAccountData> : {};
    return <RmConfirmed title="Bank Account Updated!" result={receipt} rows={[{ label: "Bank", value: saved.bank_name ?? "—" }, { label: "Account", value: saved.account_number_masked ?? "—" }, { label: "Account name", value: saved.account_name ?? "—" }]} onClose={onClose} />;
  }
  return <RmDesignModal title="Change Bank Account" subtitle="Update your payout account" pending={mutation.isPending} error={mutation.error} onClose={onClose} onSubmit={() => form.submit()} submitLabel="Save New Account" submitColor={colors.blues.primary}>
    {account && <BankSummary account={account} />}
    <Form form={form} initialValues={initialValues} layout="vertical" disabled={mutation.isPending} onFinish={values => mutation.mutate(values, { onSuccess: result => setReceipt(result) })}>
      {/* Bank directory, automatic name verification and bank-update PIN remain commented out: no corresponding endpoints or PIN field supplied. */}
      <Form.Item name="bank_name" label="Bank name" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
      <Form.Item name="bank_code" label="Bank code" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
      <Form.Item name="account_number" label="Account number" rules={[{ required: true }, { pattern: /^\d{10}$/, message: "Enter a 10-digit account number." }]}><Input inputMode="numeric" maxLength={10} showCount /></Form.Item>
      <Form.Item name="account_name" label="Account name" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
      <Form.Item name="is_default" valuePropName="checked"><Checkbox>Default payout account</Checkbox></Form.Item>
    </Form>
  </RmDesignModal>;
}
