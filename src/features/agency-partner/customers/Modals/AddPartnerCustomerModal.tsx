import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useAddPartnerCustomer } from "../../api";

export function AddPartnerCustomerModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const mutation = useAddPartnerCustomer();
  const close = (value: boolean) => { if (!value) { setFullname(""); setPhone(""); setEmail(""); setAddress(""); mutation.reset(); } onOpenChange(value); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try { await mutation.mutateAsync({ fullname, phone, email, address }); close(false); } catch { /* Mutation notification provides the failure reason. */ }
  };
  return <AppModal open={open} onOpenChange={close} title="Add Customer" description="Add a customer to your partner records" size="md" footer={null}>
    <form onSubmit={submit} className="space-y-4">
      <Field label="Full name"><input required value={fullname} onChange={(event) => setFullname(event.target.value)} className="field" placeholder="Customer full name" /></Field>
      <Field label="Phone number"><input required value={phone} maxLength={11} inputMode="numeric" onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))} className="field" placeholder="08012345678" /></Field>
      <Field label="Email"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field" placeholder="name@example.com" /></Field>
      <Field label="Address"><textarea value={address} onChange={(event) => setAddress(event.target.value)} className="field min-h-20" placeholder="Customer address" /></Field>
      <div className="flex justify-end gap-2 border-t pt-4" style={{ borderColor: colors.border }}><button type="button" onClick={() => close(false)} className="rounded-lg border px-4 py-2 text-sm" style={{ borderColor: colors.border, color: colors.textPrimary }}>Cancel</button><button disabled={mutation.isPending || phone.length !== 11} className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: colors.primary }}>{mutation.isPending ? "Saving…" : "Add Customer"}</button></div>
    </form>
    <style>{`.field{width:100%;border:1px solid ${colors.border};border-radius:0.75rem;padding:0.75rem;font-size:0.875rem;color:${colors.textPrimary};outline:none}`}</style>
  </AppModal>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block space-y-1 text-xs font-semibold" style={{ color: colors.textPrimary }}>{label}{children}</label>; }
