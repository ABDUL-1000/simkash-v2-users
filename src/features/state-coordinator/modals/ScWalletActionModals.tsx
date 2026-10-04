import { Checkbox, Form, Input, InputNumber } from "antd";
import type { ScPayoutAccountPayload } from "../types/requests";
import type { ScWalletOverviewData } from "../types/api";
import { useScRequestPayout, useScSavePayoutAccount } from "../api/mutations";
import { ScActionModal } from "../components/ScActionModal";

export function ScPayoutRequestForm({ source, balance, currency, onClose, onSuccess }: {
  source: "dashboard" | "wallet"; balance: number; currency: string; onClose: () => void; onSuccess: (message: string) => void;
}) {
  const [form] = Form.useForm<{ amount: number }>();
  const mutation = useScRequestPayout(source);
  return <ScActionModal title="Request commission payout" form={form} pending={mutation.isPending} error={mutation.error}
    onClose={onClose} onSubmit={(values) => mutation.mutate(values, { onSuccess: (result) => { onSuccess(result.message); onClose(); } })}>
    <p className="mb-4 text-sm">Available commission: {currency} {balance.toLocaleString()}</p>
    <Form.Item name="amount" label={`Amount (${currency})`} rules={[{ required: true, message: "Enter an amount." }, { type: "number", min: 0.01, max: balance, message: "Enter a positive amount within your available commission." }]}>
      <InputNumber className="w-full" min={0.01} max={balance} precision={2} />
    </Form.Item>
  </ScActionModal>;
}

export function ScBankAccountForm({ account, onClose, onSuccess }: {
  account: ScWalletOverviewData["payout_account"] | null; onClose: () => void; onSuccess: (message: string) => void;
}) {
  const [form] = Form.useForm<ScPayoutAccountPayload>();
  const mutation = useScSavePayoutAccount();
  return <ScActionModal title="Payout bank account" form={form} pending={mutation.isPending} error={mutation.error}
    onClose={onClose} onSubmit={(values) => mutation.mutate(values, { onSuccess: (result) => { onSuccess(result.message); onClose(); } })}>
    <Form.Item name="bank_name" label="Bank name" initialValue={account?.bank_name} rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="bank_code" label="Bank code" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="account_number" label="Account number" rules={[{ required: true }, { pattern: /^\d{10}$/, message: "Enter a 10-digit account number." }]}><Input inputMode="numeric" maxLength={10} /></Form.Item>
    <Form.Item name="account_name" label="Account name" initialValue={account?.account_name} rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="is_default" valuePropName="checked" initialValue={true}><Checkbox>Default payout account</Checkbox></Form.Item>
    {/* Automatic bank lookup and account verification have no documented SC endpoints. */}
  </ScActionModal>;
}
