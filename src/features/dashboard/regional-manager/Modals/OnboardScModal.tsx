import { useState } from "react";
import {
  Search,
  CheckCircle2,
  MapPin,
  AlertTriangle,
  Info,
  Plus,
  Minus,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface OnboardScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (newSc: any) => void;
}

interface CandidateUser {
  id: string;
  initials: string;
  name: string;
  phone: string;
  role: string;
  state: string;
}

const CANDIDATE_USERS: CandidateUser[] = [
  { id: "u-1", initials: "AO", name: "Aminat Okafor", phone: "08065942373", role: "Normal User", state: "Lagos" },
  { id: "u-2", initials: "CE", name: "Chidi Eze", phone: "08012345678", role: "Normal User", state: "Abuja" },
  { id: "u-3", initials: "IM", name: "Ibrahim Musa", phone: "07098765432", role: "Agency Partner", state: "Rivers" },
  { id: "u-4", initials: "FA", name: "Fatima Abdullahi", phone: "09011223344", role: "Normal User", state: "Kaduna" },
];

export function OnboardScModal({ open, onOpenChange, onSuccess }: OnboardScModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<"existing" | "new">("existing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<CandidateUser>(CANDIDATE_USERS[0]);
  const [operatingState, setOperatingState] = useState("Lagos");

  // Step 2 state: Initial Stock
  const [posQty, setPosQty] = useState(50);
  const [cctvQty, setCctvQty] = useState(25);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);
  const [customTarget, setCustomTarget] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalToSend = posQty + cctvQty + gpsQty + routerQty;
  const stockRemaining = 300 - totalToSend;

  const filteredUsers = CANDIDATE_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery)
  );

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess?.({
        name: selectedUser.name,
        state: operatingState,
        stock: totalToSend,
      });
    }, 750);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setStep(1);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Request Submitted" : "Onboard State Coordinator"}
      description={
        isSuccess
          ? "Onboarding request sent for approval"
          : step === 1
          ? "Add an SC to your network"
          : "Step 2 — Initial Stock Allocation"
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">
              Onboarding Request Submitted!
            </h3>
            <p className="mt-1 text-xs text-[#66738C] max-w-sm mx-auto">
              Request to onboard <span className="font-bold text-[#0F152A]">{selectedUser.name}</span> as SC for{" "}
              <span className="font-bold text-[#0F152A]">{operatingState}</span> with {totalToSend} initial SIMs has been sent to Super Admin.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Status</span>
              <span className="font-bold text-[#F59E0B]">Pending Super Admin Approval</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Allocated Stock</span>
              <span className="font-bold text-[#0F152A]">{totalToSend} SIMs (POS: {posQty}, CCTV: {cctvQty})</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1D4ED8]"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Done
          </button>
        </div>
      ) : step === 1 ? (
        /* STEP 1: SC DETAILS */
        <div className="space-y-4 pt-1 text-xs">
          {/* Info callout */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-[#1E40AF]">
            <Info className="size-4 shrink-0 mt-0.5 text-[#2563EB]" />
            <p className="text-[11px] leading-relaxed">
              Onboarding an SC creates their platform account within your network. Super Admin approves before the account goes live. You fund their initial SIM allocation.
            </p>
          </div>

          {/* Existing / New Segmented Control */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUserType("existing")}
              className={`rounded-xl py-2.5 text-xs font-bold transition ${
                userType === "existing"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              }`}
              style={userType === "existing" ? { backgroundColor: APP_COLORS.blues.interactiveCta } : {}}
            >
              Existing User
            </button>
            <button
              type="button"
              onClick={() => setUserType("new")}
              className={`rounded-xl py-2.5 text-xs font-bold transition ${
                userType === "new"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              New User
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 pl-9 pr-3 text-xs text-[#0F152A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-hidden"
            />
          </div>

          {/* Selectable Users List */}
          <div className="max-h-48 space-y-1.5 overflow-y-auto divide-y divide-[#F1F5F9] rounded-2xl border border-[#E2ECF6] bg-white p-1">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex cursor-pointer items-center justify-between p-2.5 rounded-xl transition ${
                  selectedUser.id === user.id ? "bg-[#EFF6FF]" : "hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#1E3A8A] text-[11px] font-bold text-white">
                    {user.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#0F152A]">{user.name}</span>
                      <span className="rounded-md bg-[#F1F5F9] px-1.5 py-0.5 text-[9px] font-bold text-[#64748B]">
                        {user.role}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#64748B]">{user.phone}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#2563EB] hover:underline">
                  {selectedUser.id === user.id ? "Selected" : "Select"}
                </span>
              </div>
            ))}
          </div>

          {/* Selected User Badge */}
          {selectedUser && (
            <div className="flex items-center justify-between rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#065F46] text-xs font-bold text-white">
                  {selectedUser.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F152A]">{selectedUser.name}</h4>
                  <p className="text-[10px] text-[#64748B]">{selectedUser.phone} · {selectedUser.state} · {selectedUser.role}</p>
                </div>
              </div>
              <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-[#64748B] shadow-xs">
                No existing SC role
              </span>
            </div>
          )}

          {/* Assignment Region */}
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FAFC] p-3 text-xs border border-[#E2ECF6]">
            <MapPin className="size-4 text-[#EF4444] shrink-0" />
            <div>
              <p className="font-bold text-[#0F152A]">Assigning to: Yusuf Adam Baba&apos;s Regional Manager network</p>
              <p className="text-[10px] text-[#64748B]">Lagos Region</p>
            </div>
          </div>

          {/* SC Operating State */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              SC Operating State
            </label>
            <select
              value={operatingState}
              onChange={(e) => setOperatingState(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
            >
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Rivers">Rivers</option>
              <option value="Kano">Kano</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Enugu">Enugu</option>
              <option value="Ogun">Ogun</option>
              <option value="Oyo">Oyo</option>
            </select>
            <p className="text-[10px] text-[#8C909B]">This SC will manage APs in this state</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              Continue →
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: STOCK & TARGET */
        <div className="space-y-4 pt-1 text-xs">
          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1 font-bold text-[#10B981]">
              <CheckCircle2 className="size-4" />
              <span>SC Details</span>
            </div>
            <div className="h-px w-10 bg-[#CBD5E1]" />
            <div className="flex items-center gap-1 font-bold text-[#2563EB]">
              <div className="flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-[9px] text-white">2</div>
              <span>Stock & Target</span>
            </div>
          </div>

          {/* Selected User Pill */}
          <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-2.5 border border-[#E2ECF6]">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-[#1E3A8A] text-[10px] font-bold text-white">
                {selectedUser.initials}
              </div>
              <span className="font-bold text-[#0F152A]">{selectedUser.name}</span>
            </div>
            <span className="text-[11px] font-bold text-[#2563EB]">Will become SC in your network</span>
          </div>

          {/* Available Stock Banner */}
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#1E40AF] space-y-1">
            <span className="font-black text-[10px] uppercase tracking-wider">Your Available Stock: 300 SIMs</span>
            <p className="text-[11px]">POS: 180 • CCTV: 72 • GPS: 30 • Router: 18</p>
          </div>

          {/* How Many SIMs to Send */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              How Many SIMs to Send Initially?
            </label>

            <div className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-white p-3 divide-y divide-[#F1F5F9]">
              {/* POS */}
              <div className="flex items-center justify-between py-1 first:pt-0">
                <div>
                  <h4 className="font-bold text-xs text-[#0F152A]">POS SIM</h4>
                  <span className="text-[10px] text-[#64748B]">180 available</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPosQty((q) => Math.max(0, q - 10))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{posQty}</span>
                  <button
                    type="button"
                    onClick={() => setPosQty((q) => Math.min(180, q + 10))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>

              {/* CCTV */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <h4 className="font-bold text-xs text-[#0F152A]">CCTV SIM</h4>
                  <span className="text-[10px] text-[#64748B]">72 available</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCctvQty((q) => Math.max(0, q - 5))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{cctvQty}</span>
                  <button
                    type="button"
                    onClick={() => setCctvQty((q) => Math.min(72, q + 5))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>

              {/* GPS */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <h4 className="font-bold text-xs text-[#0F152A]">GPS SIM</h4>
                  <span className="text-[10px] text-[#64748B]">30 available</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGpsQty((q) => Math.max(0, q - 5))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{gpsQty}</span>
                  <button
                    type="button"
                    onClick={() => setGpsQty((q) => Math.min(30, q + 5))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>

              {/* Router */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <h4 className="font-bold text-xs text-[#0F152A]">Router SIM</h4>
                  <span className="text-[10px] text-[#64748B]">18 available</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRouterQty((q) => Math.max(0, q - 2))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{routerQty}</span>
                  <button
                    type="button"
                    onClick={() => setRouterQty((q) => Math.min(18, q + 2))}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-[#0F152A]">Total: {totalToSend} SIMs</span>
                <span className="text-[11px] text-[#64748B]">Your stock after: {stockRemaining} SIMs</span>
              </div>
            </div>
          </div>

          {/* Bonus Target (Optional) */}
          <div className="space-y-1.5 rounded-2xl bg-[#F8FAFC] p-3 border border-[#E2ECF6]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F152A]">Set custom target for this SC</span>
              <button
                type="button"
                role="switch"
                aria-checked={customTarget}
                onClick={() => setCustomTarget(!customTarget)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  customTarget ? "bg-[#2563EB]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    customTarget ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-[10px] text-[#64748B]">
              Platform default: 500 activations → ₦10,000 bonus per month
            </p>
          </div>

          {/* Warning Approval Notice */}
          <div className="flex items-start gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-[#854D0E]">
            <AlertTriangle className="size-4 shrink-0 text-[#F59E0B] mt-0.5" />
            <p className="text-[11px] leading-snug">
              This onboarding request goes to Super Admin for approval. SC account activates only after admin confirms.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={isSubmitting || totalToSend === 0}
              onClick={handleSubmit}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8] disabled:opacity-50"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default OnboardScModal;
