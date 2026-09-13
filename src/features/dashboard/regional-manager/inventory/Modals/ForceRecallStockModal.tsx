import { useState } from "react";
import {
  ShieldAlert,
  Clock,
  AlertCircle,
  UserX,
  MoreHorizontal,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ForceRecallStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName: string;
  state: string;
  quantity: number;
  simType: string;
  onConfirm: (reasonDetails: { reason: string; note: string }) => void;
}

type ForceRecallReason =
  | "not-responding"
  | "stock-misuse"
  | "sc-suspension"
  | "other";

export function ForceRecallStockModal({
  open,
  onOpenChange,
  scName,
  state,
  quantity,
  simType,
  onConfirm,
}: ForceRecallStockModalProps) {
  const [selectedReason, setSelectedReason] =
    useState<ForceRecallReason>("not-responding");
  const [note, setNote] = useState("");
  const [confirmedJustified, setConfirmedJustified] = useState(true);
  const [pin, setPin] = useState(["•", "•", "•", "•"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    if (val && index < 3) {
      document.getElementById(`force-recall-pin-${index + 1}`)?.focus();
    }
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onConfirm({
        reason: selectedReason,
        note,
      });
    }, 600);
  };

  const reasons = [
    {
      id: "not-responding" as const,
      title: "SC Not Responding",
      desc: "SC hasn't responded to voluntary recall within time limit",
      icon: (
        <div className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Clock className="size-3.5" />
        </div>
      ),
    },
    {
      id: "stock-misuse" as const,
      title: "Suspected Stock Misuse",
      desc: "Possible unauthorised use of SIMs",
      icon: (
        <div className="flex size-7 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="size-3.5" />
        </div>
      ),
    },
    {
      id: "sc-suspension" as const,
      title: "Preparing SC Suspension",
      desc: "Reclaiming stock before suspending",
      icon: (
        <div className="flex size-7 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <UserX className="size-3.5" />
        </div>
      ),
    },
    {
      id: "other" as const,
      title: "Other (specify below)",
      desc: "",
      icon: (
        <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <MoreHorizontal className="size-3.5" />
        </div>
      ),
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Force Recall Stock"
      description="Bypass SC approval"
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#475569] hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!confirmedJustified || isSubmitting}
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-[#F87171] py-2.5 text-xs font-bold text-white transition hover:bg-rose-500 disabled:opacity-40"
          >
            {isSubmitting ? "Processing..." : "Force Recall Now"}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Warning Alert Banner */}
        <div className="flex items-center gap-3 rounded-2xl border border-red-300 bg-[#FFF5F5] p-3.5 text-[#EF4444]">
          <ShieldAlert className="size-5 shrink-0" />
          <p className="font-bold leading-snug text-xs">
            This action bypasses SC approval and is immediately logged with Super
            Admin for review.
          </p>
        </div>

        {/* Details Card */}
        <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Recalling from</span>
            <span className="font-bold text-[#0F152A]">
              {scName} ({state})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Amount</span>
            <span className="font-bold text-[#0F152A]">
              {quantity} {simType}s
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Type</span>
            <span className="font-bold text-[#EF4444]">Force Recall</span>
          </div>
        </div>

        {/* Why are you force recalling? */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            WHY ARE YOU FORCE RECALLING?
          </span>

          <div className="space-y-2">
            {reasons.map((r) => {
              const isSelected = selectedReason === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedReason(r.id)}
                  className={`flex w-full items-center justify-between rounded-2xl p-3 text-left transition ${
                    isSelected
                      ? "border-2 border-blue-500 bg-blue-50/20 shadow-2xs"
                      : "border border-slate-200 bg-white hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {r.icon}
                    <div>
                      <h6 className="font-bold text-xs text-[#0F152A]">
                        {r.title}
                      </h6>
                      {r.desc && (
                        <p className="text-[11px] text-[#64748B]">{r.desc}</p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex size-4.5 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <span className="size-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-1">
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe the reason for force recall in detail..."
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-[#0F152A] placeholder-slate-400 outline-hidden focus:border-red-400 focus:ring-2 focus:ring-red-100 transition resize-none"
          />
          <span className="text-[10px] text-[#8C909B] block text-left">
            Minimum 30 characters
          </span>
        </div>

        {/* Checkbox confirmation */}
        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={confirmedJustified}
            onChange={(e) => setConfirmedJustified(e.target.checked)}
            className="size-4 mt-0.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs text-[#334155] leading-snug">
            I confirm this force recall is justified and understand it will be
            reviewed by Super Admin.
          </span>
        </label>

        {/* PIN inputs */}
        <div className="text-center space-y-2 pt-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM
          </span>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`force-recall-pin-${idx}`}
                type="text"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-slate-300 bg-white text-center text-lg font-black text-[#0F152A] outline-hidden focus:border-red-400 focus:ring-2 focus:ring-red-100 transition shadow-2xs"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
