import { useState } from "react";

export function InventoryCard() {
  const [restockQty, setRestockQty] = useState("");

  const movements = [
    { date: "1 Jun 2026", type: "in", qty: "+200", color: "#10B981" },
    { date: "28 May 2026", type: "out", qty: "-15", color: "#EF4444" },
    { date: "15 May 2026", type: "out", qty: "-42", color: "#EF4444" },
    { date: "3 May 2026", type: "out", qty: "-28", color: "#EF4444" },
    { date: "20 Apr 2026", type: "in", qty: "+150", color: "#10B981" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Inventory</h3>

      {/* Stock count */}
      <div className="flex items-center gap-3">
        <span className="text-4xl font-extrabold text-[#D97706]">23</span>
        <div>
          <span className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
            Low Stock
          </span>
          <p className="text-[11px] text-[#64748B] mt-0.5">units currently in stock</p>
        </div>
      </div>

      <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex justify-between pt-1 text-[#64748B]">
          <span>Low stock threshold</span>
          <strong className="font-bold text-[#0F172A]">50 units</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Last restocked</span>
          <strong className="font-bold text-[#0F172A]">1 Jun 2026 (+200 units)</strong>
        </div>
      </div>

      {/* Restock Form */}
      <div>
        <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          RESTOCK
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            placeholder="Qty"
            className="w-24 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
          <button
            type="button"
            className="flex-1 rounded-xl bg-[#2563EB] py-2 font-bold text-white text-xs shadow-xs hover:bg-[#1D4ED8]"
          >
            Update Stock
          </button>
        </div>
      </div>

      {/* Stock Movement */}
      <div>
        <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          STOCK MOVEMENT
        </label>
        <div className="space-y-2 text-xs">
          {movements.map((m, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-[#F8FAFC]">
              <span className="text-[#64748B]">{m.date}</span>
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
                <strong className="font-bold text-xs" style={{ color: m.color }}>
                  {m.qty}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
