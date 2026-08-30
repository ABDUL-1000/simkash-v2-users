"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type InstallerOption = {
  id: string;
  initials: string;
  name: string;
  status: "AVAILABLE" | "BUSY";
  skills: string[];
  distance: string;
};

const INSTALLERS: InstallerOption[] = [
  { id: "1", initials: "AR", name: "Alex Rivera", status: "AVAILABLE", skills: ["Solar Installation", "Electrical", "Troubleshooting"], distance: "1.2 km away" },
  { id: "2", initials: "JS", name: "Jordan Smith", status: "BUSY", skills: ["HVAC", "Plumbing", "Refrigeration"], distance: "3.5 km away" },
  { id: "3", initials: "CJ", name: "Casey Jones", status: "AVAILABLE", skills: ["Electrical", "Smart Home", "Security Systems"], distance: "0.8 km away" },
  { id: "4", initials: "ML", name: "Morgan Lee", status: "AVAILABLE", skills: ["Solar Installation", "Roofing", "Heavy Equipment"], distance: "2.1 km away" },
];

type SelectInstallerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectSuccess?: (installer: InstallerOption) => void;
};

export function SelectInstallerModal({
  open,
  onOpenChange,
  onSelectSuccess,
}: SelectInstallerModalProps) {
  const [selectedId, setSelectedId] = useState("1");
  const [search, setSearch] = useState("");

  const selectedInstaller = INSTALLERS.find((i) => i.id === selectedId) || INSTALLERS[0];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Select Installer"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Selection",
          variant: "primary",
          onClick: () => {
            onSelectSuccess?.(selectedInstaller);
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-3 text-xs sm:text-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Installer Options List */}
        <div className="space-y-2.5">
          {INSTALLERS.map((inst) => {
            const isSelected = selectedId === inst.id;
            return (
              <div
                key={inst.id}
                onClick={() => setSelectedId(inst.id)}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
                  isSelected
                    ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                    : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full font-bold text-xs ${
                      isSelected ? "bg-[#2563EB] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    {inst.initials}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">{inst.name}</span>
                      {inst.status === "AVAILABLE" ? (
                        <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                          ● AVAILABLE
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
                          ● BUSY
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      {inst.skills.map((s) => (
                        <span key={s} className="rounded-md bg-[#F1F5F9] px-1.5 py-0.5 text-[10px] text-[#64748B]">
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="mt-1 flex items-center gap-1 text-[11px] text-[#94A3B8]">
                      <MapPin className="size-3" />
                      <span>{inst.distance}</span>
                    </p>
                  </div>
                </div>

                <input
                  type="radio"
                  name="installer-select"
                  checked={isSelected}
                  onChange={() => setSelectedId(inst.id)}
                  className="size-4 accent-[#2563EB]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </AppModal>
  );
}
