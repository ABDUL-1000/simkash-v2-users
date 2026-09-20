import { useState } from "react";
import { CheckCircle2, ChevronRight, Info, Search, MapPin,  } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface OnboardApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onViewApProfile?: (apId: string) => void;
}

export function OnboardApModal({
  open,
  onOpenChange,
  onSuccess,
}: OnboardApModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [userType, setUserType] = useState<"existing" | "new">("existing");
  const [searchQuery, setSearchQuery] = useState("Rabiu");
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

  const searchResults = [
    { name: "Rabiu Sani", phone: "08120600542", state: "Lagos", initials: "RS", avatarBg: "bg-[#EFF4F8] text-[#0F152A]" },
    { name: "Rabiu Alao", phone: "08034567891", state: "Lagos", initials: "RA", avatarBg: "bg-[#F3E8FF] text-[#7E22CE]" },
    { name: "Rabiu Bello", phone: "08178901234", state: "Kano", initials: "RB", avatarBg: "bg-[#FEF3C7] text-[#D97706]" },
  ];

  const selectedUser = searchResults[selectedUserIndex] || searchResults[0];
  const [operatingState, setOperatingState] = useState("Lagos State");

  // Step 2 State (Stock & Target)
  const [availableStock] = useState({
    pos: 25,
    cctv: 10,
    gps: 5,
    router: 2,
  });

  const [allocations, setAllocations] = useState({
    pos: 20,
    cctv: 5,
    gps: 5,
    router: 0,
  });

  const [customTargetEnabled, setCustomTargetEnabled] = useState(false);

  const totalToSend =
    allocations.pos + allocations.cctv + allocations.gps + allocations.router;


  const handleUpdateQty = (
    type: "pos" | "cctv" | "gps" | "router",
    delta: number
  ) => {
    setAllocations((prev) => {
      const current = prev[type];
      const maxAvailable = availableStock[type];
      const nextVal = Math.max(0, Math.min(maxAvailable, current + delta));
      return { ...prev, [type]: nextVal };
    });
  };

  const handleReset = () => {
    setStep(1);
    setSearchQuery("Rabiu");
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={
        step === 1
          ? "Onboard Agency Partner"
          : step === 2
          ? "Initial Allocation & Target"
          : ""
      }
      description={
        step === 1
          ? "Add an AP to your SC network"
          : ""
      }
      size="md"
    >
      {/* STEP 1: Details / User Selection */}
      {step === 1 && (
        <div className="space-y-4 pt-1 text-xs">
          {/* Instant Callout Info */}
          <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3.5 text-xs text-[#1F3A5F] flex items-start gap-2.5">
            <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
            <span>
              SC onboarding of APs is instant — no Super Admin approval needed.
              The AP account activates immediately after you confirm.
            </span>
          </div>

          {/* Existing / New User Tab Switcher */}
          <div className="flex rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-1">
            <button
              type="button"
              onClick={() => setUserType("existing")}
              className={`flex-1 rounded-xl py-2 text-xs font-black transition ${
                userType === "existing"
                  ? "bg-[#0F152A] text-white shadow-xs"
                  : "text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              Existing User
            </button>
            <button
              type="button"
              onClick={() => setUserType("new")}
              className={`flex-1 rounded-xl py-2 text-xs font-black transition ${
                userType === "new"
                  ? "bg-[#0F152A] text-white shadow-xs"
                  : "text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              New User
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 size-4 text-[#8C909B]" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 pl-10 pr-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Search Results List */}
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
            {searchResults.map((user, idx) => (
              <div
                key={user.phone}
                onClick={() => setSelectedUserIndex(idx)}
                className={`flex items-center justify-between p-3 cursor-pointer transition ${
                  selectedUserIndex === idx ? "bg-[#F8FAFC]" : "hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-xl font-bold text-xs ${user.avatarBg}`}
                  >
                    {user.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0F152A]">{user.name}</h4>
                    <p className="text-[10px] text-[#66738C]">
                      {user.phone} · {user.state}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-extrabold text-[#0F152A] hover:underline"
                >
                  Select
                </button>
              </div>
            ))}
          </div>

          {/* Selected User Green Box */}
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#0F152A] text-xs">
                {selectedUser.initials}
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">
                  {selectedUser.name}
                </h4>
                <p className="text-[11px] text-[#66738C]">
                  {selectedUser.phone} · {selectedUser.state} · Normal User
                </p>
              </div>
            </div>
            <span className="rounded-md bg-[#F8FAFC] border border-[#E2ECF6] px-2 py-0.5 text-[9px] font-bold text-[#8C909B]">
              No existing AP role
            </span>
          </div>

          {/* Assignment Notice */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs text-[#0F152A] flex items-center gap-2 font-medium">
            <MapPin className="size-4 text-[#2563EB] shrink-0" />
            <span>
              Assigning to: <strong>Aminat Okafor's SC network · Lagos</strong>
            </span>
          </div>

          {/* State of Operation Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              AP OPERATING STATE
            </label>
            <select
              value={operatingState}
              onChange={(e) => setOperatingState(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            >
              <option value="Lagos State">Lagos State</option>
              <option value="Abuja FCT">Abuja FCT</option>
              <option value="Rivers State">Rivers State</option>
              <option value="Kano State">Kano State</option>
            </select>
            <p className="text-[10px] text-[#8C909B]">State where AP will activate SIMs</p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition"
            >
              Continue <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Stock & Target */}
      {step === 2 && (
        <div className="space-y-4 pt-1 text-xs">
          {/* Step Breadcrumb Header */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#66738C]">
            <span className="text-[#66738C]">① Details ✓</span>
            <span>|</span>
            <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[#0F152A]">
              ② Stock & Target (active)
            </span>
          </div>

          {/* Inventory Summary Banner */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
            <span className="font-bold text-[#0F152A]">
              Your inventory: <strong>42 SIMs</strong>
            </span>
            <span className="text-[11px] font-medium text-[#66738C]">
              POS 25 · CCTV 10 · GPS 5 · Router 2
            </span>
          </div>

          {/* Target AP Info Pill Card */}
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#0F152A] text-xs">
              {selectedUser.initials}
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                {selectedUser.name}
              </h4>
              <p className="text-[10px] text-[#66738C]">
                Lagos · Role: Agency Partner Onboarding
              </p>
            </div>
          </div>

          {/* Allocation Counter List */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
            {/* POS SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#0F152A]">POS SIM</h4>
                <p className="text-[10px] text-[#8C909B]">
                  25 available · <span className="text-[#EF4444]">Your stock after: {availableStock.pos - allocations.pos} SIMs</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("pos", -5)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  -
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                  {allocations.pos}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("pos", 5)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  +
                </button>
              </div>
            </div>

            {/* CCTV SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#0F152A]">CCTV SIM</h4>
                <p className="text-[10px] text-[#8C909B]">
                  10 available · Your stock after: {availableStock.cctv - allocations.cctv} SIMs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("cctv", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  -
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                  {allocations.cctv}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("cctv", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  +
                </button>
              </div>
            </div>

            {/* GPS SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#0F152A]">GPS SIM</h4>
                <p className="text-[10px] text-[#8C909B]">
                  5 available · <span className="text-[#EF4444]">Your stock after: {availableStock.gps - allocations.gps} SIMs</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("gps", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  -
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                  {allocations.gps}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("gps", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Router SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#0F152A]">Router SIM</h4>
                <p className="text-[10px] text-[#8C909B]">
                  2 available · Your stock after: {availableStock.router - allocations.router} SIMs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("router", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  -
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                  {allocations.router}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("router", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Distributed Row */}
            <div className="p-3.5 flex justify-between font-black text-sm text-[#0F152A]">
              <span>TOTAL DISTRIBUTED</span>
              <span>{totalToSend} SIMs</span>
            </div>
          </div>

          {/* Red Warning Banner */}
          <div className="rounded-2xl border border-[#FFF7F8] bg-[#FFF7F8] p-3 text-xs text-[#EF4444] font-medium flex items-center gap-2">
            <Info className="size-4 shrink-0 text-[#EF4444]" />
            <span>
              After this allocation you'll have only 12 SIMs. Request stock from your RM before onboarding more APs.
            </span>
          </div>

          {/* Custom Target Switch Box */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-extrabold text-[#0F152A]">Set custom target</span>
            <button
              type="button"
              onClick={() => setCustomTargetEnabled(!customTargetEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                customTargetEnabled ? "bg-[#2563EB]" : "bg-[#E2ECF6]"
              }`}
            >
              <div
                className={`size-4 rounded-full bg-white transition ${
                  customTargetEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-[#66738C] flex items-center gap-2">
            <Info className="size-4 shrink-0 text-[#8C909B]" />
            <span>Default: 200 activations → ₦5,000</span>
          </div>

          {/* Green Instant Callout Box */}
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3.5 text-xs text-[#10B981] font-bold flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
            <span>
              This AP account activates immediately. No admin approval required. Rabiu Sani will receive SMS with login details.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition"
            >
              Onboard AP Now
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Success Confirmation */}
      {step === 3 && (
        <div className="space-y-5 text-center pt-2 text-xs">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-[#0F152A]">
              AP Onboarded!
            </h2>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs divide-y divide-[#E2ECF6]">
            <div className="flex justify-between py-1.5 first:pt-0">
              <span className="text-[#8C909B]">Name</span>
              <span className="font-bold text-[#0F152A]">{selectedUser.name}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Phone</span>
              <span className="font-bold text-[#0F152A]">{selectedUser.phone}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Network</span>
              <span className="font-bold text-[#0F152A]">
                Your SC · {selectedUser.state}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Stock sent</span>
              <span className="font-bold text-[#0F152A]">
                {totalToSend} SIMs
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Account status</span>
              <span className="font-bold text-[#10B981]">Active immediately</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Onboard Another
            </button>
            <button
              type="button"
              onClick={() => {
                onSuccess?.();
                handleClose();
              }}
              className="rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
