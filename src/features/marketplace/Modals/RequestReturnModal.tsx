import { useState } from "react";
import { Info, Plus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { ReturnSubmittedModal } from "./ReturnSubmittedModal";

interface RequestReturnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
}

export function RequestReturnModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
}: RequestReturnModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "Hikvision 4MP Camera",
    "GPS Tracker Pro",
    "Solar Panel 100W",
  ]);
  const [reason, setReason] = useState("Defective item");
  const [details, setDetails] = useState("");
  const [returnSubmittedOpen, setReturnSubmittedOpen] = useState(false);

  const toggleItem = (name: string) => {
    setSelectedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleSubmitReturn = () => {
    onOpenChange(false);
    setReturnSubmittedOpen(true);
  };

  return (
    <>
      <AppModal
        open={open && !returnSubmittedOpen}
        onOpenChange={onOpenChange}
        title="Request Return"
        description={orderRef}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Select Items to Return */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT ITEMS TO RETURN
            </label>

            <div className="space-y-2">
              {[
                { name: "Hikvision 4MP Camera", price: "₦89,999" },
                { name: "GPS Tracker Pro", price: "₦45,000" },
                { name: "Solar Panel 100W", price: "₦125,000" },
              ].map((item) => {
                const isSelected = selectedItems.includes(item.name);
                return (
                  <div
                    key={item.name}
                    onClick={() => toggleItem(item.name)}
                    className={`cursor-pointer flex items-center justify-between rounded-2xl border p-3.5 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItem(item.name)}
                        className="size-4 accent-[#2563EB]"
                      />
                      <span className="text-xs font-bold text-[#0F152A]">{item.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#0F152A]">{item.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reason Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Return reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="Defective item">Defective item / Doesn't work</option>
              <option value="Wrong item delivered">Wrong item delivered</option>
              <option value="Item not as described">Item not as described</option>
              <option value="Damaged packaging">Damaged packaging</option>
            </select>
          </div>

          {/* Details Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Additional details
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none"
            />
          </div>

          {/* Upload Photos */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Upload photos (optional)
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex size-14 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#E2ECF6] bg-[#F8FAFC] text-[#8C909B] hover:border-[#2563EB]"
                >
                  <Plus className="size-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Policy Notice */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3 text-xs text-[#2563EB]">
            <Info className="size-4 shrink-0 mt-0.5" />
            <p>
              Returns must be within 7 days of delivery. Items must be in original packaging.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitReturn}
              disabled={selectedItems.length === 0}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              Submit Return Request
            </button>
          </div>
        </div>
      </AppModal>

      {/* Return Submitted Receipt Modal */}
      <ReturnSubmittedModal
        open={returnSubmittedOpen}
        onOpenChange={setReturnSubmittedOpen}
        returnRef="RET-2026-00312"
      />
    </>
  );
}
