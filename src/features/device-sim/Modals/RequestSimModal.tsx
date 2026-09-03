import { useState } from "react";
import { Camera, Check, Info, Minus, Plus, Radio, Router, Smartphone } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface RequestSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestSubmitted: (data: any) => void;
}

export function RequestSimModal({
  open,
  onOpenChange,
  onRequestSubmitted,
}: RequestSimModalProps) {
  const [simType, setSimType] = useState<"pos" | "cctv" | "gps" | "router">("pos");
  const [network, setNetwork] = useState<string>("MTN");
  const [noPreference, setNoPreference] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [fulfillment, setFulfillment] = useState<"visit" | "pickup">("visit");
  const [stateVal, setStateVal] = useState("");
  const [lgaVal, setLgaVal] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onOpenChange(false);
    onRequestSubmitted({
      simType,
      network: noPreference ? "Agent Assign" : network,
      quantity,
      fulfillment,
      address: `${stateVal} · ${lgaVal}`,
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request a SIM"
      description="A Simkash agent will fulfil your request"
      size="md"
    >
      <div className="space-y-5 pt-1">
        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF4F8] p-3.5 text-xs text-[#2563EB]">
          <Info className="size-4 shrink-0 mt-0.5 text-[#2563EB]" />
          <p>
            Submit your SIM request and a Simkash agent in your area will contact you to activate your SIM.
          </p>
        </div>

        {/* SIM Type Grid */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            SIM TYPE
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "pos", label: "POS SIM", desc: "For POS terminals", icon: Smartphone },
              { id: "cctv", label: "CCTV SIM", desc: "For CCTV cameras", icon: Camera },
              { id: "gps", label: "GPS SIM", desc: "For GPS trackers", icon: Radio },
              { id: "router", label: "Router SIM", desc: "For routers/hotspots", icon: Router },
            ].map((type) => {
              const isSelected = simType === type.id;
              const IconComp = type.icon;
              return (
                <div
                  key={type.id}
                  onClick={() => setSimType(type.id as any)}
                  className={`cursor-pointer relative flex items-start gap-3 rounded-2xl border p-3.5 transition ${
                    isSelected
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <IconComp className="size-5 shrink-0 text-[#0F152A] mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2563EB]">{type.label}</h4>
                    <p className="text-[10px] text-[#8C909B]">{type.desc}</p>
                  </div>
                  {isSelected && (
                    <span className="absolute right-2.5 top-2.5 flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-white">
                      <Check className="size-2.5" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Preferred Network */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            PREFERRED NETWORK
          </label>
          <div className="flex flex-wrap gap-2.5">
            {["MTN", "Airtel", "Glo", "T2"].map((net) => {
              const isSelected = !noPreference && network === net;
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => {
                    setNoPreference(false);
                    setNetwork(net);
                  }}
                  className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white"
                      : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {net}
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={noPreference}
              onChange={(e) => setNoPreference(e.target.checked)}
              className="size-4 accent-[#2563EB]"
            />
            <span className="text-xs text-[#66738C]">
              No preference — agent will assign based on availability
            </span>
          </label>
        </div>

        {/* Quantity */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            QUANTITY
          </label>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#0F152A]">Number of SIM cards</h4>
              <p className="text-[11px] text-[#8C909B]">Maximum 5 SIM cards per request</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex size-8 items-center justify-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A]"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="text-sm font-bold text-[#0F152A]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                className="flex size-8 items-center justify-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-[#2563EB]"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* How Would You Like It */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            HOW WOULD YOU LIKE IT?
          </label>

          <div
            onClick={() => setFulfillment("visit")}
            className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
              fulfillment === "visit"
                ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                : "border-[#E2ECF6] bg-white hover:border-slate-300"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-[#2563EB]">Agent Visit</h4>
                <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  Recommended
                </span>
              </div>
              <p className="text-[11px] text-[#66738C]">An agent visits your location to set up the SIM</p>
            </div>
            <input
              type="radio"
              name="fulfillment"
              checked={fulfillment === "visit"}
              onChange={() => setFulfillment("visit")}
              className="size-4 accent-[#2563EB]"
            />
          </div>

          <div
            onClick={() => setFulfillment("pickup")}
            className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
              fulfillment === "pickup"
                ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                : "border-[#E2ECF6] bg-white hover:border-slate-300"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-[#0F152A]">Pick Up</h4>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-[#66738C]">
                  Self collect
                </span>
              </div>
              <p className="text-[11px] text-[#66738C]">Collect from your nearest Simkash hub</p>
            </div>
            <input
              type="radio"
              name="fulfillment"
              checked={fulfillment === "pickup"}
              onChange={() => setFulfillment("pickup")}
              className="size-4 accent-[#2563EB]"
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            DELIVERY ADDRESS
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={stateVal}
              onChange={(e) => setStateVal(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 px-3 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="">State</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Rivers">Rivers</option>
            </select>

            <select
              value={lgaVal}
              onChange={(e) => setLgaVal(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 px-3 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="">LGA / Area</option>
              <option value="Eti-Osa">Eti-Osa</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Lagos Island">Lagos Island</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Street address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 px-4 text-xs text-[#0F152A] outline-none"
          />

          <input
            type="text"
            placeholder="Landmark (optional)"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 px-4 text-xs text-[#0F152A] outline-none"
          />
        </div>

        {/* Additional Notes */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            ADDITIONAL NOTES (OPTIONAL)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions for the agent..."
            className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </div>
    </AppModal>
  );
}
