import { useState } from "react";
import { Popconfirm } from "antd";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useAddAddress, useDeleteAddress, useGetAddresses, useSetDefaultAddress, useUpdateAddress } from "../api";
import type { Address, AddressPayload } from "../types/api";

const empty: AddressPayload = { fullName: "", phone: "", addressLine: "", state: "", city: "", landmark: "", label: "" };

/** Address book (/user/addresses): pick, add, edit, make default, delete. `onSelect` is called with the chosen address. */
export function AddressBookModal({ open, onClose, selectedId, onSelect }: { open: boolean; onClose: () => void; selectedId?: number; onSelect?: (address: Address) => void }) {
  const book = useGetAddresses();
  const add = useAddAddress();
  const update = useUpdateAddress();
  const makeDefault = useSetDefaultAddress();
  const remove = useDeleteAddress();
  const [editing, setEditing] = useState<{ id?: number; form: AddressPayload } | null>(null);
  const saving = add.isPending || update.isPending;
  const form = editing?.form;
  const set = (key: keyof AddressPayload, value: string | boolean) => setEditing((prev) => prev && { ...prev, form: { ...prev.form, [key]: value } });
  const valid = form && form.fullName.trim() && form.phone.trim() && form.addressLine.trim() && form.state.trim();
  const save = () => {
    if (!editing || !valid) return;
    const body = Object.fromEntries(Object.entries(editing.form).map(([k, v]) => [k, typeof v === "string" ? v.trim() || undefined : v])) as unknown as AddressPayload;
    const done = { onSuccess: () => setEditing(null) };
    if (editing.id) update.mutate({ id: editing.id, ...body }, done); else add.mutate(body, done);
  };
  const input = "w-full rounded-xl border border-[#E2ECF6] px-3 py-2 text-xs outline-none focus:border-[#2563EB]";

  return <AppModal open={open} onOpenChange={(value) => { if (!value) { setEditing(null); onClose(); } }} title={editing ? (editing.id ? "Edit address" : "Add address") : "Delivery address"} size="md" footer={null}>
    {editing ? <div className="space-y-2.5 text-xs">
      <div className="grid gap-2.5 sm:grid-cols-2">
        <input className={input} placeholder="Full name *" value={form!.fullName} onChange={(e) => set("fullName", e.target.value)} />
        <input className={input} placeholder="Phone *" inputMode="tel" value={form!.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <input className={input} placeholder="Address line *" value={form!.addressLine} onChange={(e) => set("addressLine", e.target.value)} />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <input className={input} placeholder="City" value={form!.city ?? ""} onChange={(e) => set("city", e.target.value)} />
        <input className={input} placeholder="State *" value={form!.state} onChange={(e) => set("state", e.target.value)} />
        <input className={input} placeholder="Landmark" value={form!.landmark ?? ""} onChange={(e) => set("landmark", e.target.value)} />
        <input className={input} placeholder="Label (e.g. Home)" value={form!.label ?? ""} onChange={(e) => set("label", e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-[#66738C]"><input type="checkbox" checked={Boolean(form!.isDefault)} onChange={(e) => set("isDefault", e.target.checked)} /> Make this my default address</label>
      <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3">
        <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-[#E2ECF6] px-4 py-2 font-bold">Back</button>
        <button type="button" disabled={!valid || saving} onClick={save} className="rounded-xl bg-[#2563EB] px-5 py-2 font-bold text-white disabled:opacity-50">{saving ? "Saving…" : "Save address"}</button>
      </div>
    </div> : <div className="space-y-3 text-xs">
      {book.isPending ? <div className="h-24 animate-pulse rounded-xl bg-slate-100" /> : book.addresses.length === 0 ? <AppEmptyState icon={<MapPin className="size-5" />} title="No saved address" description="Add a delivery address to continue." /> :
        book.addresses.map((address) => <div key={address.id} className={`rounded-xl border p-3 ${selectedId === address.id ? "border-[#2563EB] bg-[#EFF4F8]" : "border-[#E2ECF6]"}`}>
          <button type="button" onClick={() => { onSelect?.(address); onClose(); }} className="w-full text-left">
            <p className="font-extrabold text-[#0F152A]">{address.fullName}{address.label && <span className="ml-1.5 font-semibold text-[#8C909B]">· {address.label}</span>}{address.isDefault && <span className="ml-1.5 rounded-full bg-[#EBFFF8] px-1.5 py-0.5 text-[9px] font-bold text-[#10B981]">Default</span>}</p>
            <p className="text-[#66738C]">{address.formatted}</p><p className="font-mono text-[#8C909B]">{address.phone}</p>
          </button>
          <div className="mt-2 flex gap-3 text-[11px] font-bold">
            <button type="button" onClick={() => setEditing({ id: address.id, form: { fullName: address.fullName, phone: address.phone, addressLine: address.addressLine, state: address.state, city: address.city ?? "", landmark: address.landmark ?? "", label: address.label ?? "" } })} className="text-[#2563EB]">Edit</button>
            {!address.isDefault && <button type="button" onClick={() => makeDefault.mutate(address.id)} className="text-[#2563EB]">Make default</button>}
            <Popconfirm title="Delete this address?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => remove.mutateAsync(address.id).catch(() => undefined)}>
              <button type="button" className="ml-auto flex items-center gap-1 text-[#EF4444]"><Trash2 className="size-3" /> Delete</button>
            </Popconfirm>
          </div>
        </div>)}
      {book.addresses.length < book.maxAddresses && <button type="button" onClick={() => setEditing({ form: { ...empty, isDefault: book.addresses.length === 0 } })} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#2563EB] py-2.5 font-bold text-[#2563EB]"><Plus className="size-3.5" /> Add new address</button>}
    </div>}
  </AppModal>;
}
