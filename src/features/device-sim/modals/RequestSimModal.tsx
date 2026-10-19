import { useState } from "react";
import { Check, MessageCircle, Phone } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { StateLgaSelect, type StateLgaValue } from "@/components/forms/StateLgaSelect";
import { useRequestDeviceSim } from "../api/useRequestDeviceSim";
import type { RequestSimResponseData, SimRequestDelivery, SimRequestNetwork, SimRequestType } from "../types/api";

const simTypes: Array<{ value: SimRequestType; label: string }> = [{ value: "pos", label: "POS SIM" }, { value: "cctv", label: "CCTV SIM" }, { value: "gps", label: "GPS SIM" }, { value: "router", label: "Router SIM" }];
const networks: SimRequestNetwork[] = ["MTN", "Airtel", "Glo", "T2", "No preference"];
const deliveries: Array<{ value: SimRequestDelivery; hint: string }> = [{ value: "Agent Visit", hint: "Recommended · Agent visits your location" }, { value: "Pick Up", hint: "Collect from a nearby hub" }];
const MAX_QUANTITY = 5;
const label = "mb-2 text-[10px] font-bold uppercase text-[#8C909B]";
const input = "w-full rounded-lg border border-[#E2ECF6] p-2.5 text-sm outline-none focus:border-[#2563EB]";

function RequestSubmitted({ data, onDone }: { data: RequestSimResponseData; onDone: () => void }) {
  const agent = data.assigned_agent;
  const address = data.delivery_address;
  return <div className="space-y-4 text-center">
    <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50"><span className="flex size-11 items-center justify-center rounded-full bg-[#10B981] text-white"><Check className="size-6 stroke-3" /></span></span>
    <div><h3 className="text-lg font-bold text-[#0F152A]">Request Submitted!</h3><p className="text-xs text-[#8C909B]">Request #{data.request_id} · <span className="font-semibold capitalize text-[#D9990D]">{data.status}</span></p></div>
    <div className="space-y-2 rounded-xl bg-[#F7F9FC] p-4 text-left text-xs">{[["SIM type", data.typeLabel], ["Network", data.preferred_network], ["Quantity", `${data.quantity} SIM${data.quantity > 1 ? "s" : ""}`], ["Delivery", data.delivery_method], ["Address", [address.street_address, address.lga, address.state].filter(Boolean).join(", ")]].map(([key, value]) =>
      <div key={key} className="flex justify-between gap-3"><span className="text-[#8C909B]">{key}</span><span className="text-right font-semibold text-[#0F152A]">{value}</span></div>)}</div>
    {agent ? <div className="rounded-xl border border-[#E2ECF6] p-4 text-left">
      <p className={label}>Your assigned agent</p>
      <p className="text-sm font-bold text-[#0F152A]">{agent.fullname}</p><p className="text-xs text-[#8C909B]">{agent.phone} · {agent.email}</p>
      <div className="mt-3 flex gap-2">
        <a href={`tel:${agent.phone}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E2ECF6] py-2 text-xs font-semibold text-[#0F152A] hover:bg-slate-50"><Phone className="size-3.5" /> Call</a>
        {agent.whatsapp_link && <a href={agent.whatsapp_link} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] py-2 text-xs font-semibold text-white hover:brightness-95"><MessageCircle className="size-3.5" /> WhatsApp</a>}
      </div>
    </div> : <p className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-[#2563EB]">A Simkash agent in your area will contact you shortly.</p>}
    <button type="button" onClick={onDone} className="w-full rounded-lg bg-[#2563EB] py-2.5 text-sm font-semibold text-white">Done</button>
  </div>;
}

export function RequestSimModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState<SimRequestType>("pos");
  const [network, setNetwork] = useState<SimRequestNetwork>("No preference");
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<SimRequestDelivery>("Agent Visit");
  const [location, setLocation] = useState<StateLgaValue>({});
  const [street, setStreet] = useState(""); const [landmark, setLandmark] = useState(""); const [notes, setNotes] = useState("");
  const request = useRequestDeviceSim();
  const pending = request.isPending;

  const close = () => {
    if (pending) return;
    setType("pos"); setNetwork("No preference"); setQuantity(1); setDelivery("Agent Visit"); setLocation({}); setStreet(""); setLandmark(""); setNotes(""); request.reset(); onClose();
  };
  const submit = () => {
    if (!location.state || !location.lga || !street.trim()) return;
    request.mutate({ sim_type: type, preferred_network: network, quantity, delivery_method: delivery, country: "Nigeria", state: location.state, lga: location.lga,
      street_address: street.trim(), landmark: landmark.trim() || undefined, additional_notes: notes.trim() || undefined });
  };

  return <AppModal open={open} onOpenChange={(v) => !v && close()} showCloseButton={!pending} title={request.data ? undefined : "Request a SIM"} description={request.data ? undefined : "A Simkash agent will fulfil your request"} size="lg">
    {request.data ? <RequestSubmitted data={request.data.data} onDone={close} /> : <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
      <p className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-[#2563EB]">Submit a SIM request and a Simkash agent in your area will contact you to activate your SIM.</p>
      <section><p className={label}>SIM type</p><div className="grid grid-cols-2 gap-2">{simTypes.map((item) => <button type="button" key={item.value} disabled={pending} onClick={() => setType(item.value)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${type === item.value ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-[#E2ECF6]"}`}>{item.label}<small className="mt-1 block text-xs font-normal text-[#8C909B]">For {item.label.toLowerCase()}</small></button>)}</div></section>
      <section><p className={label}>Preferred network</p><div className="flex flex-wrap gap-2">{networks.map((item) => <button type="button" key={item} disabled={pending} onClick={() => setNetwork(item)} className={`rounded-full border px-3 py-1.5 text-xs ${network === item ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-[#E2ECF6]"}`}>{item}</button>)}</div></section>
      <div className="flex items-center justify-between text-sm"><span>Number of SIM cards <small className="block text-xs text-[#8C909B]">Maximum {MAX_QUANTITY} SIM cards per request</small></span><div className="flex items-center"><button type="button" aria-label="Decrease quantity" disabled={pending || quantity <= 1} onClick={() => setQuantity(quantity - 1)} className="rounded-l-lg border border-[#E2ECF6] px-3 py-2 disabled:opacity-40">−</button><span className="border-y border-[#E2ECF6] px-4 py-2">{quantity}</span><button type="button" aria-label="Increase quantity" disabled={pending || quantity >= MAX_QUANTITY} onClick={() => setQuantity(quantity + 1)} className="rounded-r-lg border border-[#E2ECF6] px-3 py-2 disabled:opacity-40">＋</button></div></div>
      <section><p className={label}>Delivery method</p><div className="grid grid-cols-2 gap-2">{deliveries.map((item) => <button type="button" key={item.value} disabled={pending} onClick={() => setDelivery(item.value)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${delivery === item.value ? "border-[#2563EB] bg-blue-50" : "border-[#E2ECF6]"}`}>{item.value}<small className="mt-1 block text-xs font-normal text-[#8C909B]">{item.hint}</small></button>)}</div></section>
      <section className="space-y-2"><p className={label}>{delivery === "Pick Up" ? "Your location" : "Delivery address"}</p>
        <StateLgaSelect value={location} onChange={setLocation} disabled={pending} size="middle" />
        <textarea value={street} disabled={pending} onChange={(e) => setStreet(e.target.value)} placeholder="Street address" className={`${input} min-h-16`} />
        <input value={landmark} disabled={pending} onChange={(e) => setLandmark(e.target.value)} placeholder="Landmark (optional)" className={input} />
        <textarea value={notes} disabled={pending} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes (optional)" className={`${input} min-h-16`} />
      </section>
      {request.error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">{request.error.message}</p>}
      <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3"><button type="button" onClick={close} disabled={pending} className="rounded-lg border border-[#E2ECF6] px-4 py-2 text-xs disabled:opacity-50">Cancel</button><button type="button" onClick={submit} disabled={pending || !location.state || !location.lga || !street.trim()} className="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">{pending ? "Submitting…" : "Submit Request"}</button></div>
    </div>}
  </AppModal>;
}
