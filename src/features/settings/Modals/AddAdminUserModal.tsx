"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type AddAdminUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSuccess?: () => void;
};

export function AddAdminUserModal({
  open,
  onOpenChange,
  onAddSuccess,
}: AddAdminUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Finance Admin");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Admin Team Member"
      description="Grant administrative access to platform dashboard"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "add_admin",
          label: "Add Admin",
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
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Wilson"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. sarah.w@simkash.com"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Admin Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Finance Admin">Finance Admin</option>
            <option value="Operations Admin">Operations Admin</option>
            <option value="Support Admin">Support Admin</option>
          </select>
        </div>
      </div>
    </AppModal>
  );
}
