"use client";

import { useState, useEffect } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useCaUpdatePartner } from "../api/useCaPartners";
import { openNotification } from "@/utils/notifications";
import type { PartnerProfile } from "../types/api";

interface EditPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId: number | string;
  initialValues?: Partial<PartnerProfile>;
  onSuccess?: () => void;
}

export function EditPartnerModal({
  open,
  onOpenChange,
  partnerId,
  initialValues,
  onSuccess,
}: EditPartnerModalProps) {
  const [fullname, setFullname] = useState(initialValues?.fullname || "");
  const [phone, setPhone] = useState(initialValues?.phone || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [state, setState] = useState(initialValues?.state || "");
  const [lga, setLga] = useState(initialValues?.lga || "");
  const [address, setAddress] = useState(initialValues?.address || "");

  useEffect(() => {
    if (initialValues) {
      if (initialValues.fullname) setFullname(initialValues.fullname);
      if (initialValues.phone) setPhone(initialValues.phone);
      if (initialValues.email) setEmail(initialValues.email);
      if (initialValues.state) setState(initialValues.state);
      if (initialValues.lga) setLga(initialValues.lga);
      if (initialValues.address) setAddress(initialValues.address);
    }
  }, [initialValues]);

  const updateMutation = useCaUpdatePartner(partnerId);

  const handleUpdate = () => {
    if (!fullname.trim()) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Full name is required.",
      });
      return;
    }
    if (!phone.trim()) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Phone number is required.",
      });
      return;
    }

    updateMutation.mutate(
      {
        fullname: fullname.trim(),
        phone: phone.trim(),
        email: email.trim(),
        state: state.trim(),
        lga: lga.trim(),
        address: address.trim(),
      },
      {
        onSuccess: () => {
          onSuccess?.();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Agency Partner Details"
      description={`Update profile details for AP #${partnerId}`}
      size="md"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          closeOnClick: true,
          disabled: updateMutation.isPending,
        },
        {
          key: "save",
          label: updateMutation.isPending ? "Saving..." : "Save Changes",
          variant: "primary",
          onClick: handleUpdate,
          disabled: updateMutation.isPending,
        },
      ]}
    >
      <div className="space-y-3 pt-1 text-xs">
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
            />
          </div>
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
            />
          </div>
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">LGA</label>
            <input
              type="text"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Street Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>
    </AppModal>
  );
}
