import { useState } from "react";
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  MessageSquare,
  QrCode,
  Share2,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ReferPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewAllReferrals?: () => void;
}

export function ReferPartnerModal({
  open,
  onOpenChange,
  onViewAllReferrals,
}: ReferPartnerModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showTopAlert, setShowTopAlert] = useState(false);

  const referralCode = "YUSUF50K";
  const referralLink = "simkash.com/ref/YUSUF50K";
  const suggestedMessage = `Hi, I use Simkash to manage SIMs and earn commission. Join as a partner using my code ${referralCode} and we both benefit. Sign up ${referralLink}`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopiedCode(true);
    setShowTopAlert(true);
    setTimeout(() => {
      setCopiedCode(false);
    }, 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    setShowTopAlert(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 3000);
  };

  const handleShareOption = (platform: string) => {
    if (platform === "WhatsApp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(suggestedMessage)}`, "_blank");
    } else if (platform === "Copy") {
      handleCopyLink();
    } else {
      alert(`Sharing via ${platform}...`);
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Refer a Partner"
      description="Grow the network, earn rewards"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs max-h-[82vh] overflow-y-auto pr-1">
        {/* Top Alert Banner (Matching Image 3) */}
        {showTopAlert && (
          <div className="-mt-3 -mx-6 mb-2 bg-[#EBFFF8] border-b border-[#10B981]/30 p-2.5 px-6 flex items-center justify-between text-[#10B981] text-xs font-bold animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="size-4 stroke-[3]" />
              <span>Link copied to clipboard!</span>
            </div>
            <button
              type="button"
              onClick={() => setShowTopAlert(false)}
              className="text-[#10B981] hover:text-emerald-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. REFERRAL REWARD BANNER (Matching Image 2) */}
        <div className="rounded-3xl bg-[#191C38] p-5 text-center text-white space-y-1 shadow-md">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A5B4FC]">
            REFERRAL REWARD
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white py-0.5">
            ₦50,000
          </h2>
          <p className="text-[11px] text-[#C7D2FE] leading-tight">
            for every referred business that becomes a Simkash partner
          </p>
        </div>

        {/* 2. REFERRAL CODE CARD */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
              REFERRAL CODE
            </span>
            <span className="text-base font-extrabold font-mono text-[#0F152A]">
              {referralCode}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className={`rounded-xl px-4 py-2 text-xs font-bold shadow-xs transition ${
              copiedCode
                ? "bg-[#10B981] text-white"
                : "bg-[#2563EB] text-white hover:bg-blue-700"
            }`}
          >
            {copiedCode ? "Copied" : "Copy"}
          </button>
        </div>

        {/* 3. SHARE YOUR LINK */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SHARE YOUR LINK
          </label>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-1.5 pl-3.5 flex items-center justify-between">
            <span className="text-xs font-mono text-[#0F152A] font-semibold truncate mr-2">
              {referralLink}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`rounded-xl px-4 py-2 text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                copiedLink
                  ? "bg-[#10B981] text-white"
                  : "bg-[#2563EB] text-white hover:bg-blue-700"
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="size-3.5 stroke-[3]" />
                  <span>Copied</span>
                </>
              ) : (
                "Copy Link"
              )}
            </button>
          </div>
        </div>

        {/* 4. SOCIAL SHARE BUTTONS (5 Circular Options) */}
        <div className="grid grid-cols-5 gap-2 py-1 text-center">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => handleShareOption("WhatsApp")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs group-hover:scale-105 transition">
              <MessageCircle className="size-5" />
            </div>
            <span className="text-[10px] font-bold text-[#66738C]">WhatsApp</span>
          </button>

          {/* SMS */}
          <button
            type="button"
            onClick={() => handleShareOption("SMS")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xs group-hover:scale-105 transition">
              <MessageSquare className="size-5" />
            </div>
            <span className="text-[10px] font-bold text-[#66738C]">SMS</span>
          </button>

          {/* Email */}
          <button
            type="button"
            onClick={() => handleShareOption("Email")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-xs group-hover:scale-105 transition">
              <Mail className="size-5" />
            </div>
            <span className="text-[10px] font-bold text-[#66738C]">Email</span>
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={() => handleShareOption("Copy")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-[#EFF4F8] text-[#0F152A] shadow-xs group-hover:scale-105 transition">
              <Copy className="size-5" />
            </div>
            <span className="text-[10px] font-bold text-[#66738C]">Copy</span>
          </button>

          {/* QR Code */}
          <button
            type="button"
            onClick={() => handleShareOption("QR Code")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-[#0F152A] text-white shadow-xs group-hover:scale-105 transition">
              <QrCode className="size-5" />
            </div>
            <span className="text-[10px] font-bold text-[#66738C]">QR Code</span>
          </button>
        </div>

        {/* 5. SUGGESTED MESSAGE */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SUGGESTED MESSAGE
          </label>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-[#0F152A] font-medium leading-relaxed">
            {suggestedMessage}
          </div>
        </div>

        {/* 6. STATS CARDS (3 Columns) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
              REFERRED
            </span>
            <span className="text-base font-black text-[#0F152A]">3</span>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
              CLOSED
            </span>
            <span className="text-base font-black text-[#0F152A]">1</span>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
              EARNED
            </span>
            <span className="text-base font-black text-[#0F152A]">₦50,000</span>
          </div>
        </div>

        {/* 7. VIEW ALL REFERRALS LINK */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewAllReferrals?.();
            }}
            className="text-xs font-black text-[#2563EB] hover:underline"
          >
            View all referrals →
          </button>
        </div>

        {/* 8. ACTION BUTTONS */}
        <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleCopyLink();
            }}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Share2 className="size-4" />
            <span>Share Now</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
