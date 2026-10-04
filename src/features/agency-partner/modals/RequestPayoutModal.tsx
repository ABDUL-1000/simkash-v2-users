import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useRequestPartnerPayout } from "../api";

export function RequestPayoutModal({ open, onOpenChange, availableBalance }: { open: boolean; onOpenChange: (open: boolean) => void; availableBalance: number }) {
  const [amount, setAmount] = useState("");
  const payout = useRequestPartnerPayout();
  const value = Number(amount);
  const submit = async () => { if (!value || value > availableBalance) return; try { await payout.mutateAsync({ amount: value }); setAmount(""); onOpenChange(false); } catch { /* Hook displays the API error notification. */ } };
  return <AppModal open={open} onOpenChange={onOpenChange} title="Request Payout" description="Withdraw your available commission balance" size="sm" footer={null}><div className="space-y-4"><div className="rounded-xl p-3 text-sm" style={{ color: colors.textSecondary, background: `${colors.primary}0A` }}>Available balance <strong style={{ color: colors.textPrimary }}>₦{availableBalance.toLocaleString()}</strong></div><label className="block space-y-1 text-xs font-semibold" style={{ color: colors.textPrimary }}>Payout amount<input type="number" min={1} max={availableBalance} value={amount} onChange={(event) => setAmount(event.target.value)} className="w-full rounded-xl border p-3 text-sm" style={{ borderColor: colors.border }} placeholder="Enter amount" /></label><div className="flex justify-end gap-2"><button type="button" onClick={() => onOpenChange(false)} className="rounded-lg border px-4 py-2 text-sm" style={{ borderColor: colors.border }}>Cancel</button><button type="button" onClick={submit} disabled={!value || value > availableBalance || payout.isPending} className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50" style={{ background: colors.primary }}>{payout.isPending ? "Submitting…" : "Request Payout"}</button></div></div></AppModal>;
}
