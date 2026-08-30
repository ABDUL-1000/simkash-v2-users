"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type AddWebhookModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSuccess?: () => void;
};

export function AddWebhookModal({
  open,
  onOpenChange,
  onAddSuccess,
}: AddWebhookModalProps) {
  const [url, setUrl] = useState("");
  const [secret, setSecret] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Webhook Endpoint"
      description="Configure event notification endpoint"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save_webhook",
          label: "Save Webhook",
          variant: "primary",
          onClick: () => {
            onAddSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Webhook URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/webhooks/simkash"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Signing Secret (optional)
          </label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="whsec_..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
