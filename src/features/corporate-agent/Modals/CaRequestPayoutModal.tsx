import { Button, Form, InputNumber } from "antd";
import { useCaRequestPayout } from "../api/useCaRequestPayout";
import type { CaRequestPayoutPayload } from "../types/api";
import { CaActionModal, CaConfirmed } from "./CaActionModal";
export function CaRequestPayoutModal({ balance, allowed, onClose }: { balance: number; allowed: boolean; onClose: () => void }) {
  const [form] = Form.useForm<CaRequestPayoutPayload>();
  const mutation = useCaRequestPayout();
  if (mutation.isSuccess) return <CaConfirmed title="Payout Requested!" result={mutation.data} onClose={onClose} />;
  return <CaActionModal title="Request Payout" description="Withdraw your commission earnings" onClose={onClose} onSubmit={() => form.submit()} pending={mutation.isPending} error={mutation.error} disabled={!allowed || balance <= 0} submitLabel="Request Payout">
    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2"><span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Available to Withdraw</span><div className="text-3xl font-black text-emerald-600 tracking-tight">₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div></div>
    <Form form={form} layout="vertical" disabled={mutation.isPending} onFinish={values => { if (!mutation.isPending && allowed && values.amount > 0 && values.amount <= balance) mutation.mutate({ amount: values.amount }); }}>
      <Form.Item name="amount" label="Withdrawal amount" rules={[{ required: true, type: "number", min: 0.01, max: balance }]}><InputNumber prefix="₦" precision={2} min={0.01} max={balance} className="!w-full" /></Form.Item>
      <Button disabled={mutation.isPending || !allowed} onClick={() => form.setFieldValue("amount", balance)}>Full balance</Button>
      {/* InputOTP / bank changes remain commented: request-payout accepts amount only, no PIN verification or bank-update endpoint is supplied. Never collect an unvalidated PIN. */}
    </Form>
  </CaActionModal>;
}
