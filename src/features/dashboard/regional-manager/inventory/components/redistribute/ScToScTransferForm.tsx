import { useState } from "react";
import {
  Smartphone,
  Video,
  Navigation,
  Wifi,
  Minus,
  Plus,
  AlertTriangle,
  Check,
  Search,
  ChevronDown,
} from "lucide-react";
import type {
  ScNetworkMapItem,
  RedistributeReason,
} from "../../../types/rm-redistribute.types";
import { SC_NETWORK_MAP_DATA } from "../../../data/rm-redistribute.data";

interface ScToScTransferFormProps {
  fromSc: ScNetworkMapItem;
  toSc: ScNetworkMapItem;
  onSelectFromSc: (sc: ScNetworkMapItem) => void;
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
  notifyScs: boolean;
  setNotifyScs: (val: boolean) => void;
  onClear: () => void;
  onPreview: () => void;
  onPreviewNotifications?: () => void;
}

export function ScToScTransferForm({
  fromSc,
  toSc,
  onSelectFromSc,
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
  notifyScs,
  setNotifyScs,
  onClear,
  onPreview,
  onPreviewNotifications,
}: ScToScTransferFormProps) {
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const totalTransferQty = posQty + cctvQty + gpsQty + routerQty;
  const fromFirstName = fromSc.fullName.split(" ")[0];
  const toFirstName = toSc.fullName.split(" ")[0];

  const reasonsList: { id: RedistributeReason; title: string; desc: string }[] =
    [
      {
        id: "balance-stock",
        title: "Balance Stock",
        desc: "Optimize distribution across SCs",
      },
      {
        id: "urgent-request",
        title: "Urgent Request",
        desc: "SC needs SIMs urgently",
      },
      {
        id: "campaign-support",
        title: "Campaign Support",
        desc: "Supporting a sales campaign",
      },
      {
        id: "sc-closing",
        title: "SC Closing",
        desc: "Redistribute before SC closes",
      },
      {
        id: "other",
        title: "Other",
        desc: "Specify in notes",
      },
    ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6 shadow-2xs">
      {/* Form Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-[#0F152A]">
          SC to SC Transfer
        </h3>
        <p className="text-xs text-[#64748B]">
          Select source SC, destination SC, then enter quantities
        </p>
      </div>

      {/* 1. TRANSFER FROM */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          TRANSFER FROM
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowFromDropdown(!showFromDropdown);
              setShowToDropdown(false);
            }}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-[#0F152A] hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <Search className="size-3.5 text-slate-400" />
              <span>
                {fromSc.fullName} — {fromSc.state}
              </span>
            </div>
            <ChevronDown className="size-4 text-slate-400" />
          </button>

          {showFromDropdown && (
            <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
              {SC_NETWORK_MAP_DATA.filter((s) => s.id !== toSc.id).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    onSelectFromSc(sc);
                    setShowFromDropdown(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#0F152A] hover:bg-slate-100"
                >
                  <span>
                    {sc.fullName} — {sc.state}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {sc.stock} SIMs
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected From Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                {fromSc.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#0F152A]">
                  {fromSc.fullName} - {fromSc.state}
                </h5>
                <p className="text-[11px] text-[#64748B]">{fromSc.phone}</p>
              </div>
            </div>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-black text-[#D97706] border border-amber-200">
              {fromSc.stock} SIMs
            </span>
          </div>

          <div className="border-t border-slate-200/60 pt-2 text-[11px]">
            <span className="text-[10px] font-black uppercase text-[#8C909B] block mb-1">
              {fromFirstName.toUpperCase()}&apos;S CURRENT STOCK
            </span>
            <div className="flex flex-wrap gap-2 text-[#475569]">
              <span className="rounded-lg bg-blue-50 px-2 py-0.5 font-bold text-blue-700">
                POS {fromSc.posStock}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5">
                CCTV {fromSc.cctvStock}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5">
                GPS {fromSc.gpsStock}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5">
                Router {fromSc.routerStock}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRANSFER TO */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          TRANSFER TO
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowToDropdown(!showToDropdown);
              setShowFromDropdown(false);
            }}
            className="flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/20 px-4 py-2.5 text-xs font-semibold text-[#0F152A] hover:bg-emerald-50/40"
          >
            <div className="flex items-center gap-2">
              <Search className="size-3.5 text-emerald-600" />
              <span>
                {toSc.fullName} — {toSc.state}
              </span>
            </div>
            <ChevronDown className="size-4 text-emerald-600" />
          </button>

          {showToDropdown && (
            <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
              {SC_NETWORK_MAP_DATA.filter((s) => s.id !== fromSc.id).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    onSelectToSc(sc);
                    setShowToDropdown(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#0F152A] hover:bg-slate-100"
                >
                  <span>
                    {sc.fullName} — {sc.state}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {sc.stock} SIMs
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected To Card */}
        <div className="rounded-2xl border border-emerald-100 bg-[#EBFFF8]/40 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#EBFFF8] text-xs font-bold text-[#10B981]">
                {toSc.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#0F152A]">
                  {toSc.fullName} - {toSc.state}
                </h5>
                <p className="text-[11px] text-[#64748B]">{toSc.phone}</p>
              </div>
            </div>
            <span className="rounded-full bg-[#FFF7F8] px-3 py-1 text-xs font-black text-[#EF4444] border border-red-200">
              {toSc.stock} SIMs
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#EF4444]">
            <AlertTriangle className="size-3.5" />
            <span>
              Out of Stock · Will receive all {totalTransferQty} transferred SIMs
            </span>
          </div>
        </div>
      </div>

      {/* 3. HOW MUCH TO TRANSFER? */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          3 HOW MUCH TO TRANSFER?
        </span>

        {/* Notice */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#FFFBEB] p-3 text-xs text-[#92400E] border border-amber-200">
          <span className="text-sm">⚠️</span>
          <span>
            You can only transfer what {fromFirstName} currently has (
            {fromSc.stock} SIMs max)
          </span>
        </div>

        {/* Stepper Rows */}
        <div className="space-y-2 text-xs">
          {/* POS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                <Smartphone className="size-4" />
              </div>
              <div>
                <p className="font-bold text-[#0F152A]">POS SIM</p>
                <p className="text-[11px] text-[#64748B]">
                  {fromSc.posStock} in {fromFirstName}&apos;s stock
                </p>
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
                disabled={posQty >= fromSc.posStock}
                onClick={() => setPosQty(Math.min(fromSc.posStock, posQty + 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
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
                <p className="text-[11px] text-[#64748B]">
                  {fromSc.cctvStock} available
                </p>
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
                disabled={cctvQty >= fromSc.cctvStock}
                onClick={() => setCctvQty(Math.min(fromSc.cctvStock, cctvQty + 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
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
                <p className="text-[11px] text-[#64748B]">
                  {fromSc.gpsStock} available
                </p>
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
                disabled={gpsQty >= fromSc.gpsStock}
                onClick={() => setGpsQty(Math.min(fromSc.gpsStock, gpsQty + 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
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
                <p className="text-[11px] text-[#64748B]">
                  {fromSc.routerStock} available
                </p>
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
                disabled={routerQty >= fromSc.routerStock}
                onClick={() =>
                  setRouterQty(Math.min(fromSc.routerStock, routerQty + 1))
                }
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Transfer math mini-strip */}
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center text-xs">
          <div>
            <span className="text-[10px] text-[#8C909B] block">Transferring</span>
            <span className="font-bold text-[#0F152A]">
              {totalTransferQty} SIMs
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B] block">
              {fromFirstName} after
            </span>
            <span className="font-bold text-[#EF4444]">
              {Math.max(0, fromSc.stock - totalTransferQty)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B] block">
              {toFirstName} after
            </span>
            <span className="font-bold text-[#10B981]">
              {toSc.stock + totalTransferQty}
            </span>
          </div>
        </div>
      </div>

      {/* 4. SELECT REASON */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          4 SELECT REASON
        </span>

        <div className="space-y-2">
          {reasonsList.map((r) => {
            const isSelected = reason === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setReason(r.id)}
                className={`flex w-full items-center justify-between rounded-2xl p-3 text-left transition ${
                  isSelected
                    ? "border-2 border-[#1E293B] bg-white shadow-xs"
                    : "border border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div>
                  <h6 className="font-bold text-xs text-[#0F152A]">{r.title}</h6>
                  <p className="text-[11px] text-[#64748B]">{r.desc}</p>
                </div>
                {isSelected && (
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#1E293B] text-white">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. NOTES (OPTIONAL) */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          5 NOTES (OPTIONAL)
        </span>

        <div className="relative">
          <textarea
            rows={3}
            maxLength={300}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this redistribution..."
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-[#0F152A] placeholder-slate-400 outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
          />
          <span className="absolute bottom-2.5 right-3 text-[10px] text-[#8C909B]">
            {notes.length} / 300
          </span>
        </div>

        {/* Notify SCs toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-[#0F152A]">Notify SCs</p>
              {onPreviewNotifications && (
                <button
                  type="button"
                  onClick={onPreviewNotifications}
                  className="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  Preview SMS
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#64748B]">
              {fromFirstName} &amp; {toFirstName} will receive a notification
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotifyScs(!notifyScs)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifyScs ? "bg-[#10B981]" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                notifyScs ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Action buttons */}
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
          disabled={totalTransferQty === 0}
          onClick={onPreview}
          className="flex-1 rounded-2xl bg-[#1E293B] py-3 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-40 shadow-xs"
        >
          Preview Transfer →
        </button>
      </div>
    </div>
  );
}
