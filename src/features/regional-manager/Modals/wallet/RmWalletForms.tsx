import { Checkbox, Form, Input, InputNumber } from "antd";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { useRequestRmPayout, useSaveRmPayoutAccount } from "../../api/wallet";
import type { RmPayoutAccountData } from "../../types/wallet";
import type { RmBankPayload, RmWalletPayoutPayload } from "../../types/territory";
import { RmActionModal } from "../dashboard/RmActionModal";

export function RmWalletPayoutModal({ balance, account, onClose }: { balance: number; account: RmPayoutAccountData; onClose: () => void }) {
  const [form] = Form.useForm<RmWalletPayoutPayload>();
  const mutation = useRequestRmPayout();
  return <RmActionModal title="Request regional payout" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => { if (account.is_verified) mutation.mutate(values, { onSuccess: () => { form.resetFields(); onClose(); } }); }}>
    <p className="mb-4 text-sm">{account.bank_name} · {account.account_number_masked} · {account.account_name}</p>
    <Form.Item name="amount" label="Amount" rules={[{ required: true }, { type: "number", min: 0.01, max: balance, message: "Enter an amount within your available commission." }]}><InputNumber min={0.01} max={balance} precision={2} className="w-full" /></Form.Item>
    <Form.Item name="pin" label="4-digit transaction PIN" rules={[{ required: true }, { pattern: /^\d{4}$/, message: "Enter all four PIN digits." }]}>
      <InputOTP maxLength={4} type="password" inputMode="numeric" pattern="^[0-9]*$" autoComplete="off" disabled={mutation.isPending} aria-label="Transaction PIN"
        render={({ slots }) => <InputOTPGroup>{slots.map((slot, index) => <div key={index} className="flex size-12 items-center justify-center rounded-lg border text-xl" style={{ borderColor: slot.isActive ? colors.primary : colors.border }}>{slot.char ? "•" : ""}</div>)}</InputOTPGroup>} />
    </Form.Item>
  </RmActionModal>;
}
export function RmPayoutAccountModal({ account, onClose }: { account?: RmPayoutAccountData | null; onClose: () => void }) {
  const [form] = Form.useForm<RmBankPayload>();
  const mutation = useSaveRmPayoutAccount();
  const initialValues = account ? { bank_name: account.bank_name, bank_code: account.bank_code, account_number: account.account_number, account_name: account.account_name, is_default: account.is_default } : { is_default: true };
  return <RmActionModal title="Payout account" form={form} initialValues={initialValues} pending={mutation.isPending} error={mutation.error} onClose={onClose} onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    {/* Commented out: <BankSelect /> — no bank-directory endpoint supplied; bank name/code are entered directly. */}
    <Form.Item name="bank_name" label="Bank name" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="bank_code" label="Bank code" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="account_number" label="Account number" rules={[{ required: true }, { pattern: /^\d{10}$/, message: "Enter a 10-digit account number." }]}><Input inputMode="numeric" maxLength={10} /></Form.Item>
    <Form.Item name="account_name" label="Account name" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="is_default" valuePropName="checked"><Checkbox>Default payout account</Checkbox></Form.Item>
  </RmActionModal>;
}
