"use client";

import { AppModal } from "@/components/common/AppModal";

type SubscriberDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriber?: {
    name?: string;
    phone?: string;
    location?: string;
    email?: string;
    status?: string;
    plan?: string;
    network?: string;
    joinedDate?: string;
    accountId?: string;
    usedGb?: number;
    totalGb?: number;
    nextRenewalDate?: string;
    nextRenewalDays?: string;
    nextRenewalAmount?: string;
  };
  onRenewNow?: () => void;
  onChangePlan?: () => void;
  onSuspendSubscriber?: () => void;
};

export function SubscriberDetailModal({
  open,
  onOpenChange,
  subscriber = {
    name: "Adaeze Okonkwo",
    phone: "0803 456 7890",
    location: "Lagos, Nigeria",
    email: "adaeze.okonkwo@email.com",
    status: "ACTIVE",
    plan: "Business",
    network: "MTN",
    joinedDate: "Jan 15, 2024",
    accountId: "SK-00483",
    usedGb: 7.8,
    totalGb: 10,
    nextRenewalDate: "Jul 15, 2025",
    nextRenewalDays: "16 days remaining",
    nextRenewalAmount: "₦8,500",
  },
  onRenewNow,
  onChangePlan,
}: SubscriberDetailModalProps) {
  const usagePct = Math.round(((subscriber.usedGb || 7.8) / (subscriber.totalGb || 10)) * 100);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Subscriber Detail"
      size="md"
      actions={[
        { key: "close", label: "Close", variant: "secondary", closeOnClick: true },
        {
          key: "changePlan",
          label: "Change Plan",
          variant: "primary",
          onClick: () => {
            onChangePlan?.();
          },
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Header Subscriber Box */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] font-bold text-base">
              {subscriber.name
                ? subscriber.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "AO"}
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] text-base">{subscriber.name}</h3>
              <p className="text-xs text-[#64748B]">
                {subscriber.phone} · {subscriber.location}
              </p>
              <a href={`mailto:${subscriber.email}`} className="text-xs font-semibold text-[#2563EB] hover:underline">
                {subscriber.email}
              </a>
            </div>
          </div>

          <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1 font-bold text-xs text-[#059669]">
            {subscriber.status}
          </span>
        </div>

        {/* 4-Column Metrics Summary Grid */}
        <div className="grid grid-cols-4 divide-x divide-[#E2E8F0] rounded-2xl bg-[#F8FAFC] p-4 text-xs">
          <div className="px-2 first:pl-0">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">PLAN</span>
            <strong className="font-bold text-[#0F172A]">{subscriber.plan}</strong>
          </div>
          <div className="px-2">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">NETWORK</span>
            <strong className="font-bold text-[#0F172A]">{subscriber.network}</strong>
          </div>
          <div className="px-2">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">JOINED</span>
            <strong className="font-bold text-[#0F172A]">{subscriber.joinedDate}</strong>
          </div>
          <div className="px-2">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">ACCOUNT ID</span>
            <strong className="font-bold text-[#0F172A]">{subscriber.accountId}</strong>
          </div>
        </div>

        {/* Data Usage Section */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="font-bold text-[#0F172A]">Data Usage</span>
            <span className="text-[#64748B]">
              {subscriber.usedGb} / {subscriber.totalGb} GB ({usagePct}%)
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div
              className="h-full rounded-full bg-[#2563EB] transition-all"
              style={{ width: `${usagePct}%` }}
            />
          </div>
        </div>

        {/* Next Renewal Alert Box */}
        <div className="flex items-center justify-between rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
          <div>
            <p className="font-bold text-[#92400E] text-xs sm:text-sm">
              Next Renewal: {subscriber.nextRenewalDate}
            </p>
            <p className="mt-0.5 text-xs text-[#92400E]">
              {subscriber.nextRenewalDays} · {subscriber.nextRenewalAmount} will be charged automatically
            </p>
          </div>

          <button
            type="button"
            onClick={onRenewNow}
            className="rounded-xl bg-[#D97706] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#B45309] shadow-xs"
          >
            Renew Now
          </button>
        </div>
      </div>
    </AppModal>
  );
}
