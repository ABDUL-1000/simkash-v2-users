import { useState } from "react";
import { AlertCircle, Check, Minus, Plus, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface TransferSimFormData {
  recipientName: string;
  recipientPhone: string;
  posQty: number;
  cctvQty: number;
  gpsQty: number;
  routerQty: number;
  totalQty: number;
  stockAfter: number;
  scApprover: string;
  reason: string;
}

interface TransferSimStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToConfirm?: (data: TransferSimFormData) => void;
}

export function TransferSimStockModal({
  open,
  onOpenChange,
  onProceedToConfirm,
}: TransferSimStockModalProps) {
  const [searchAp, setSearchAp] = useState("");
  const [recipient, setRecipient] = useState({
    name: "Rabiu Sani",
    phone: "08120600542",
    location: "Lagos",
    scAssigned: "Aminat Okafor",
  });
console.log(setRecipient);
  const [quantities, setQuantities] = useState({
    pos: 10,
    cctv: 5,
    gps: 0,
    router: 0,
  });

  const availableStock = { pos: 18, cctv: 12, gps: 8, router: 4 };
  const totalStock = 42;

  const totalTransferring =
    quantities.pos + quantities.cctv + quantities.gps + quantities.router;
  const stockAfter = totalStock - totalTransferring;

  const [reason, setReason] = useState("Partner running low");

  const handleUpdateQty = (
    type: "pos" | "cctv" | "gps" | "router",
    delta: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.min(
        availableStock[type],
        Math.max(0, prev[type] + delta)
      ),
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalTransferring <= 0) return;
    onOpenChange(false);
    onProceedToConfirm?.({
      recipientName: recipient.name,
      recipientPhone: recipient.phone,
      posQty: quantities.pos,
      cctvQty: quantities.cctv,
      gpsQty: quantities.gps,
      routerQty: quantities.router,
      totalQty: totalTransferring,
      stockAfter,
      scApprover: recipient.scAssigned,
      reason,
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Transfer SIM Stock"
      description="Move SIMs to another Agency Partner"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleContinue} className="space-y-4 pt-1 text-xs">
        {/* Yellow Amber Alert Banner (Matching Image 1) */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-xs text-[#D9990D] font-medium flex items-start gap-2.5">
          <AlertCircle className="size-4 shrink-0 text-[#D9990D] mt-0.5" />
          <span>
            Transferring SIMs reduces your own stock. Only transfer if you have excess. Transfer requires SC approval before it is confirmed.
          </span>
        </div>

        {/* Current Inventory Summary Box (Matching Image 1) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
          <h4 className="font-extrabold text-[#0F152A] text-xs">
            Your stock: 42 SIMs
          </h4>
          <p className="text-[11px] font-medium text-[#66738C]">
            POS 18 · CCTV 12 · GPS 8 · Router 4
          </p>
        </div>

        {/* TRANSFER TO SECTION */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            TRANSFER TO
          </label>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 size-4 text-[#8C909B]" />
            <input
              type="text"
              placeholder="Search Agency Partner by name or phone..."
              value={searchAp}
              onChange={(e) => setSearchAp(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white pl-10 pr-4 py-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Selected AP Card (Matching Image 1) */}
          <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8]/60 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#EFF4F8] font-black text-[#2563EB] text-xs">
                  RS
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A] text-xs">
                    {recipient.name} · AP
                  </h4>
                  <p className="text-[11px] text-[#66738C] font-mono">
                    {recipient.phone} · {recipient.location}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#EBFFF8] border border-[#9DF8DA] px-2.5 py-1 text-[10px] font-extrabold text-[#10B981] flex items-center gap-1">
                <Check className="size-3 stroke-[3]" />
                Same SC network
              </span>
            </div>
            <p className="text-[10px] text-[#66738C] font-medium pt-0.5">
              SC Assigned: <strong className="text-[#0F152A]">{recipient.scAssigned}</strong>
            </p>
          </div>
        </div>

        {/* SIM QUANTITIES SECTION (Matching Image 1) */}
        <div className="space-y-3 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SIM QUANTITIES
          </label>

          {/* POS SIM */}
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">POS SIM</h5>
              <p className="text-[10px] text-[#8C909B]">18 available</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#8C909B] font-medium">
                {availableStock.pos - quantities.pos} remaining
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("pos", -1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-6 text-center font-extrabold text-xs text-[#0F152A]">
                  {quantities.pos}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("pos", 1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">CCTV SIM</h5>
              <p className="text-[10px] text-[#8C909B]">12 available</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#8C909B] font-medium">
                {availableStock.cctv - quantities.cctv} remaining
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("cctv", -1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-6 text-center font-extrabold text-xs text-[#0F152A]">
                  {quantities.cctv}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("cctv", 1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">GPS SIM</h5>
              <p className="text-[10px] text-[#8C909B]">8 available</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#8C909B] font-medium">
                {availableStock.gps - quantities.gps} remaining
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("gps", -1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-6 text-center font-extrabold text-xs text-[#0F152A]">
                  {quantities.gps}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("gps", 1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Router SIM */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">Router SIM</h5>
              <p className="text-[10px] text-[#8C909B]">4 available</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#8C909B] font-medium">
                {availableStock.router - quantities.router} remaining
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("router", -1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-6 text-center font-extrabold text-xs text-[#0F152A]">
                  {quantities.router}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("router", 1)}
                  className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reason for Transfer */}
        <div className="space-y-1 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            Reason for Transfer
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-extrabold"
          >
            <option value="Partner running low">Partner running low</option>
            <option value="Stock rebalancing">Stock rebalancing</option>
            <option value="Urgent customer order">Urgent customer order</option>
          </select>
        </div>

        {/* Transfer Subtotal Bar */}
        <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-xs font-bold">
          <span className="text-[#0F152A] font-extrabold">
            Transferring: {totalTransferring} SIMs total
          </span>
          <span className="text-[#8C909B]">
            Your stock after: <strong className="text-[#0F152A]">{stockAfter} SIMs</strong>
          </span>
        </div>

        {/* Action Buttons (Matching Image 1) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={totalTransferring <= 0}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
