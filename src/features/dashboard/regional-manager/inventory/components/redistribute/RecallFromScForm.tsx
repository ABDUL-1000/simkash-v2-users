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
  Warehouse,
} from "lucide-react";
import type {
  ScNetworkMapItem,
  RedistributeReason,
} from "../../../types/rm-redistribute.types";
import { SC_NETWORK_MAP_DATA } from "../../../data/rm-redistribute.data";

interface RecallFromScFormProps {
  sc: ScNetworkMapItem;
  onSelectSc: (sc: ScNetworkMapItem) => void;
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

export function RecallFromScForm({
  sc,
  onSelectSc,
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
}: RecallFromScFormProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const totalRecallQty = posQty + cctvQty + gpsQty + routerQty;
  const firstName = sc.fullName.split(" ")[0];

  const recallReasons: { id: RedistributeReason; title: string; desc: string }[] =
    [
      {
        id: "balance-stock",
        title: "Excess Stock",
        desc: "SC has accumulated more inventory than needed",
      },
      {
        id: "urgent-request",
        title: "Reallocation to High-Demand Region",
        desc: "Move stock to SCs experiencing stock-outs",
      },
      {
        id: "sc-closing",
        title: "SC Inactive / Account Closing",
        desc: "Reclaim stock before closing SC operations",
      },
      {
        id: "other",
        title: "Other Reason",
        desc: "Provide details in notes below",
      },
    ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6 shadow-2xs">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-[#0F152A]">
          Recall from SC
        </h3>
        <p className="text-xs text-[#64748B]">
          Bring stock back from an SC into your own inventory
        </p>
      </div>

      {/* 1. RECALL FROM */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          RECALL FROM SC
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
                {sc.fullName} — {sc.state}
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
                    onSelectSc(item);
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
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                {sc.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#0F152A]">
                  {sc.fullName} - {sc.state}
                </h5>
                <p className="text-[11px] text-[#64748B]">{sc.phone}</p>
              </div>
            </div>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-black text-[#D97706] border border-amber-200">
              {sc.stock} SIMs available
            </span>
          </div>

          <div className="border-t border-slate-200/60 pt-2 text-[11px]">
            <span className="text-[10px] font-black uppercase text-[#8C909B] block mb-1">
              CURRENT STOCK BREAKDOWN
            </span>
            <div className="flex flex-wrap gap-2 text-[#475569]">
              <span className="rounded-lg bg-blue-50 px-2 py-0.5 font-bold text-blue-700">
                POS {sc.posStock}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5">
                CCTV {sc.cctvStock}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5">
                GPS {sc.gpsStock}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5">
                Router {sc.routerStock}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DESTINATION: YOUR INVENTORY */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          DESTINATION
        </span>
        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-[#EBFFF8]/50 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
              <Warehouse className="size-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-[#0F152A]">
                Your Inventory (Regional Warehouse)
              </h5>
              <p className="text-[11px] text-[#64748B]">
                Current balance: {rmStock} SIMs
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#10B981]">
            +{totalRecallQty} upon recall
          </span>
        </div>
      </div>

      {/* 3. QUANTITIES TO RECALL */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          QUANTITIES TO RECALL
        </span>

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
                  {sc.posStock} in {firstName}&apos;s stock
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
                disabled={posQty >= sc.posStock}
                onClick={() => setPosQty(Math.min(sc.posStock, posQty + 1))}
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
                  {sc.cctvStock} available
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
                disabled={cctvQty >= sc.cctvStock}
                onClick={() => setCctvQty(Math.min(sc.cctvStock, cctvQty + 1))}
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
                  {sc.gpsStock} available
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
                disabled={gpsQty >= sc.gpsStock}
                onClick={() => setGpsQty(Math.min(sc.gpsStock, gpsQty + 1))}
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
                  {sc.routerStock} available
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
                disabled={routerQty >= sc.routerStock}
                onClick={() =>
                  setRouterQty(Math.min(sc.routerStock, routerQty + 1))
                }
                className="flex size-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Warning if 0 remains */}
        {sc.stock - totalRecallQty === 0 && (
          <div className="flex items-center gap-2 rounded-2xl bg-[#FFFBEB] p-3 text-xs text-[#92400E] border border-amber-200">
            <AlertTriangle className="size-4 shrink-0 text-[#D97706]" />
            <span>
              {firstName} will have 0 SIMs remaining after this recall.
            </span>
          </div>
        )}
      </div>

      {/* 4. SELECT REASON */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          REASON FOR RECALL
        </span>

        <div className="space-y-2">
          {recallReasons.map((r) => {
            const isSelected = reason === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setReason(r.id)}
                className={`flex w-full items-center justify-between rounded-2xl p-3 text-left transition ${
                  isSelected
                    ? "border-2 border-[#10B981] bg-white shadow-xs"
                    : "border border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div>
                  <h6 className="font-bold text-xs text-[#0F152A]">{r.title}</h6>
                  <p className="text-[11px] text-[#64748B]">{r.desc}</p>
                </div>
                {isSelected && (
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#10B981] text-white">
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
            placeholder="Specify reason or internal context for this recall..."
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-[#0F152A] placeholder-slate-400 outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition resize-none"
          />
          <span className="absolute bottom-2.5 right-3 text-[10px] text-[#8C909B]">
            {notes.length} / 300
          </span>
        </div>

        {/* Notify SC */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-xs">
          <div>
            <p className="font-bold text-[#0F152A]">SMS Confirmation to SC</p>
            <p className="text-[11px] text-[#64748B]">
              {firstName} will receive an SMS to confirm handover
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
          disabled={totalRecallQty === 0}
          onClick={onPreview}
          className="flex-1 rounded-2xl bg-[#10B981] py-3 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:opacity-40 shadow-xs"
        >
          Preview Recall →
        </button>
      </div>
    </div>
  );
}
