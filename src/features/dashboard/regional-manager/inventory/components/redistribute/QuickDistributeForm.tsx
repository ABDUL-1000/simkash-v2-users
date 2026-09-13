import { useState } from "react";
import {
  Smartphone,
  Video,
  Navigation,
  Wifi,
  Minus,
  Plus,
  Check,
  Search,
  ChevronDown,
  Warehouse,
} from "lucide-react";
import type {
  ScNetworkMapItem,
  RedistributeReason,
} from "../../../types/rm-redistribute.types";
import { SC_NETWORK_MAP_DATA } from "../../../data/rm-redistribute.data";

interface QuickDistributeFormProps {
  toSc: ScNetworkMapItem;
  onSelectToSc: (sc: ScNetworkMapItem) => void;
  posQty: number;
  setPosQty: (qty: number) => void;
  cctvQty: number;
  setCctvQty: (qty: number) => void;
  gpsQty: number;
  setGpsQty: (qty: number) => void;
  routerQty: number;
  setRouterQty: (qty: number) => void;
  reason: RedistributeReason;
  setReason: (r: RedistributeReason) => void;
  notes: string;
  setNotes: (n: string) => void;
  notifySc: boolean;
  setNotifySc: (val: boolean) => void;
  rmStock: number;
  onClear: () => void;
  onPreview: () => void;
}

export function QuickDistributeForm({
  toSc,
  onSelectToSc,
  posQty,
  setPosQty,
  cctvQty,
  setCctvQty,
  gpsQty,
  setGpsQty,
  routerQty,
  setRouterQty,
  reason,
  setReason,
  notes,
  setNotes,
  notifySc,
  setNotifySc,
  rmStock,
  onClear,
  onPreview,
}: QuickDistributeFormProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const totalQty = posQty + cctvQty + gpsQty + routerQty;
  const firstName = toSc.fullName.split(" ")[0];

  const quickReasons: { id: RedistributeReason; title: string; desc: string }[] =
    [
      {
        id: "urgent-request",
        title: "Emergency Top-up",
        desc: "SC is depleted and waiting for stock",
      },
      {
        id: "campaign-support",
        title: "Promotional Event Support",
        desc: "Extra stock for ongoing sales blitz",
      },
      {
        id: "balance-stock",
        title: "Weekly Scheduled Reorder",
        desc: "Standard quota distribution",
      },
      {
        id: "other",
        title: "Other Reason",
        desc: "Custom allocation",
      },
    ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6 shadow-2xs">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-[#0F152A]">
          RM to SC (Quick Distribute)
        </h3>
        <p className="text-xs text-[#64748B]">
          Directly allocate SIMs from your inventory to an SC
        </p>
      </div>

      {/* 1. SOURCE */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          SOURCE: REGIONAL INVENTORY
        </span>
        <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-[#EFF6FF]/60 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
              <Warehouse className="size-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-[#0F152A]">
                Your Regional Stock
              </h5>
              <p className="text-[11px] text-[#64748B]">
                Available to allocate: {rmStock} SIMs
              </p>
            </div>
          </div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#2563EB]">
            -{totalQty} to allocate
          </span>
        </div>
      </div>

      {/* 2. RECIPIENT SC */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          RECIPIENT SC
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-[#0F152A] hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <Search className="size-3.5 text-slate-400" />
              <span>
                {toSc.fullName} — {toSc.state}
              </span>
            </div>
            <ChevronDown className="size-4 text-slate-400" />
          </button>

          {showDropdown && (
            <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
              {SC_NETWORK_MAP_DATA.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectToSc(item);
                    setShowDropdown(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#0F152A] hover:bg-slate-100"
                >
                  <span>
                    {item.fullName} — {item.state}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {item.stock} SIMs
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                {toSc.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#0F152A]">
                  {toSc.fullName} - {toSc.state}
                </h5>
                <p className="text-[11px] text-[#64748B]">{toSc.phone}</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#0F152A]">
              Current: {toSc.stock} SIMs
            </span>
          </div>

          <div className="text-[11px] font-bold text-[#10B981]">
            ✔ Will receive +{totalQty} SIMs (New balance: {toSc.stock + totalQty})
          </div>
        </div>
      </div>

      {/* 3. QUANTITIES */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          QUANTITIES TO SEND
        </span>

        {/* Steppers */}
        <div className="space-y-2 text-xs">
          {/* POS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                <Smartphone className="size-4" />
              </div>
              <div>
                <p className="font-bold text-[#0F152A]">POS SIM</p>
                <p className="text-[11px] text-[#64748B]">Available in RM: 120</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={posQty <= 0}
                onClick={() => setPosQty(Math.max(0, posQty - 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#0F152A]">
                {posQty}
              </span>
              <button
                type="button"
                onClick={() => setPosQty(posQty + 1)}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Video className="size-4" />
              </div>
              <div>
                <p className="font-bold text-[#0F152A]">CCTV SIM</p>
                <p className="text-[11px] text-[#64748B]">Available in RM: 60</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={cctvQty <= 0}
                onClick={() => setCctvQty(Math.max(0, cctvQty - 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#0F152A]">
                {cctvQty}
              </span>
              <button
                type="button"
                onClick={() => setCctvQty(cctvQty + 1)}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Navigation className="size-4" />
              </div>
              <div>
                <p className="font-bold text-[#0F152A]">GPS SIM</p>
                <p className="text-[11px] text-[#64748B]">Available in RM: 40</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={gpsQty <= 0}
                onClick={() => setGpsQty(Math.max(0, gpsQty - 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#0F152A]">
                {gpsQty}
              </span>
              <button
                type="button"
                onClick={() => setGpsQty(gpsQty + 1)}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Router SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Wifi className="size-4" />
              </div>
              <div>
                <p className="font-bold text-[#0F152A]">Router SIM</p>
                <p className="text-[11px] text-[#64748B]">Available in RM: 80</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={routerQty <= 0}
                onClick={() => setRouterQty(Math.max(0, routerQty - 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#0F152A]">
                {routerQty}
              </span>
              <button
                type="button"
                onClick={() => setRouterQty(routerQty + 1)}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SELECT REASON */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          REASON
        </span>

        <div className="space-y-2">
          {quickReasons.map((r) => {
            const isSelected = reason === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setReason(r.id)}
                className={`flex w-full items-center justify-between rounded-2xl p-3 text-left transition ${
                  isSelected
                    ? "border-2 border-[#2563EB] bg-white shadow-xs"
                    : "border border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div>
                  <h6 className="font-bold text-xs text-[#0F152A]">{r.title}</h6>
                  <p className="text-[11px] text-[#64748B]">{r.desc}</p>
                </div>
                {isSelected && (
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-white">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. NOTES */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          NOTES (OPTIONAL)
        </span>

        <div className="relative">
          <textarea
            rows={3}
            maxLength={300}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes for this quick dispatch..."
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-[#0F152A] placeholder-slate-400 outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
          />
          <span className="absolute bottom-2.5 right-3 text-[10px] text-[#8C909B]">
            {notes.length} / 300
          </span>
        </div>

        {/* Notify */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-xs">
          <div>
            <p className="font-bold text-[#0F152A]">Notify {firstName}</p>
            <p className="text-[11px] text-[#64748B]">
              Send SMS dispatch alert with reference number
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotifySc(!notifySc)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifySc ? "bg-[#10B981]" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                notifySc ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row pt-2">
        <button
          type="button"
          onClick={onClear}
          className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition"
        >
          Clear Form
        </button>
        <button
          type="button"
          disabled={totalQty === 0}
          onClick={onPreview}
          className="flex-1 rounded-2xl bg-[#2563EB] py-3 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-40 shadow-xs"
        >
          Dispatch Stock ({totalQty}) →
        </button>
      </div>
    </div>
  );
}
