import { useState } from "react";
import { Button, Drawer, Input, Progress, Spin, Tabs } from "antd";
import { useGetPartnerCustomerDetail, useAddCustomerNote, useEditPartnerCustomer } from "../../api";
import { colors } from "@/constants/colors";

export function CustomerDetailDrawer({ id, open, onClose }: { id?: number; open: boolean; onClose: () => void }) {
  const { customer, isLoading } = useGetPartnerCustomerDetail(id);
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ fullname: "", phone: "", email: "", address: "" });
  const edit = useEditPartnerCustomer();
  const addNote = useAddCustomerNote();
  const saveNote = async () => { if (!id || !note.trim()) return; try { await addNote.mutateAsync({ id, content: note.trim() }); setNote(""); } catch { /* Mutation notification is shown by the hook. */ } };
  const beginEdit = () => { if (!customer) return; setDraft({ fullname: customer.fullname, phone: customer.phone, email: customer.email, address: customer.address }); setEditing(true); };
  const saveProfile = async () => { if (!customer) return; try { await edit.mutateAsync({ id: customer.id, ...draft }); setEditing(false); } catch { /* Mutation notification is shown by the hook. */ } };

  const tabs = customer ? [
    { key: "profile", label: "Profile & Active SIM", children: <div className="space-y-4"><section className="rounded-xl p-4" style={{ background: `${colors.primary}0A` }}><div className="mb-3 flex items-center justify-between"><div><p className="font-bold" style={{ color: colors.textPrimary }}>{customer.fullname}</p><p className="text-xs" style={{ color: colors.textSecondary }}>Customer since {customer.customer_since}</p></div><Button type="link" onClick={editing ? () => setEditing(false) : beginEdit}>{editing ? "Cancel Edit" : "Edit Profile"}</Button></div>{editing ? <div className="space-y-2"><Input value={draft.fullname} onChange={(event) => setDraft({ ...draft, fullname: event.target.value })} placeholder="Full name"/><Input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} placeholder="Phone"/><Input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} placeholder="Email"/><Input value={draft.address} onChange={(event) => setDraft({ ...draft, address: event.target.value })} placeholder="Address"/><Button type="primary" loading={edit.isPending} onClick={saveProfile}>Save profile</Button></div> : <div className="space-y-1 text-xs" style={{ color: colors.textSecondary }}><p>{customer.phone}</p><p>{customer.email}</p><p>{customer.address || "No address provided"}</p></div>}</section>
      <section className="rounded-xl border p-4" style={{ borderColor: colors.border }}><div className="mb-2 flex justify-between"><strong style={{ color: colors.textPrimary }}>{customer.active_sim.sim_number}</strong><span style={{ color: colors.primary }}>{customer.active_sim.network}</span></div><p className="text-xs" style={{ color: colors.textSecondary }}>{customer.active_sim.type_label} · {customer.active_sim.plan}</p><Progress percent={customer.active_sim.data_usage.percentage} strokeColor={colors.primary} /><p className="text-xs" style={{ color: colors.textSecondary }}>{customer.active_sim.data_usage.used} used of {customer.active_sim.data_usage.total} · Expires {customer.active_sim.expires_at}</p></section></div> },
    { key: "renewals", label: "Renewal History", children: <div className="space-y-3">{customer.renewal_history.length ? customer.renewal_history.map((item, index) => <div key={`${item.started_at}-${index}`} className="border-l-2 py-1 pl-3" style={{ borderColor: colors.primary }}><p className="text-sm font-semibold">{item.plan_name} · ₦{item.amount_charged.toLocaleString()}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{item.started_at} – {item.expires_at}</p><p className="text-xs">{item.description}</p></div>) : <p className="text-sm" style={{ color: colors.textSecondary }}>No renewal history.</p>}</div> },
    { key: "notes", label: "Notes", children: <div className="space-y-3"><div className="flex gap-2"><Input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a customer note" /><Button type="primary" loading={addNote.isPending} onClick={saveNote}>Add</Button></div>{customer.notes.map((item) => <div key={item.id} className="rounded-lg border p-3" style={{ borderColor: colors.border }}><p className="text-sm">{item.content}</p><p className="mt-1 text-xs" style={{ color: colors.textSecondary }}>{new Date(item.created_at).toLocaleString()}</p></div>)}</div> },
  ] : [];
  return <Drawer title={customer?.fullname ?? "Customer Profile"} open={open} onClose={onClose} size="large" styles={{ body: { padding: 20 } }}>
    {isLoading || !customer ? <div className="flex justify-center p-12"><Spin /></div> : <Tabs items={tabs} />}
  </Drawer>;
}
